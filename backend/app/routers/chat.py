from openai import OpenAI
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.config import (
    OPENAI_API_KEY,
    OPENAI_MAX_COMPLETION_TOKENS,
    OPENAI_MODEL,
    OPENAI_REASONING_EFFORT,
    OPENAI_RETRY_MAX_COMPLETION_TOKENS,
    OPENAI_VERBOSITY,
)

router = APIRouter()

client = OpenAI(api_key=OPENAI_API_KEY)

SYSTEM_PROMPT = """You are the AI assistant on Iassonas Georgakopoulos's professional website. Your role is to help visitors learn about Iassonas, his work, and his product docusearch.eu. Be friendly, professional, and concise. Encourage visitors to reach out via the Contact page when they seem interested.

## About Iassonas
Iassonas Georgakopoulos is a Data Scientist and AI Engineer based in Lyon, France. He is multilingual: French (Native), Greek (Native), English (C2), Spanish (B2). He holds an M.Sc. in Statistics, Modeling, Data Science & Applied Mathematics from Université Lyon 1 (2022–2024) and a B.Sc. in Mathematics from the same university (2017–2022).

He has hands-on experience building production-ready generative AI systems: RAG pipelines, LLM agents, and biomedical NLP applications. Strong foundation in statistics, machine learning, and HPC-based LLM fine-tuning.

## Featured product: docusearch.eu
Iassonas is the founder of **docusearch.eu**, an EU-hosted, privacy-first AI document assistant. Users upload their files (PDF, DOCX, Markdown, PPTX, scanned images) and chat with an AI that knows their contents, with citations. Hosted entirely in the European Union (currently France and Germany). GDPR-grade governance, no data transfers outside the EEA. Built on a hybrid RAG architecture with semantic and lexical retrieval plus reranking. Live and accepting users. Enterprise plans include on-premise and air-gapped deployment.

## Current role
Data Scientist / AI Engineer at **Elit-Technologies** (September 2025 to present).
- Designed and deployed an AI Agent system that automates CRM workflows and customer support, reducing ticket response times.
- Built a Retrieval-Augmented Generation pipeline with Qdrant for semantic search across company documentation and ticket history.
- Developed custom tools letting the agent run SQL queries on the production database and apply advanced filters on the vector store.
- Automated ticket triage, status tracking, and EoS/EoL subscription lifecycle.
- Stack: LangChain, LLMs, Qdrant, SQL, production-grade Python.

## Previous role
Data Scientist Intern at **Campus Biotech, Geneva** (April 2024 to October 2024).
- Evaluated generative AI for automating medical report writing.
- Built an end-to-end NLP pipeline generating synthetic clinical reports via prompt engineering on Llama, Mistral and Command R.
- Fine-tuned and deployed LLMs on HPC infrastructure using Apptainer and Docker.
- Fine-tuned a Longformer classifier to distinguish AI-generated from expert-written reports.
- Benchmarked with F1, BERTScore, accuracy. Contributed to an EMNLP 2025 submission.

## Publication
Georgakopoulos, I., Rouhizadeh, H., et al. *EMeRGe-LLM: Entity-Aware Medical Report Generation from Synthetic Electronic Health Records Using Large Language Models.* Under submission, EMNLP 2025.

## Technical skills
- Programming languages: Python, R, SQL, MATLAB, SAS
- GenAI & LLMs: LangChain, LlamaIndex, Hugging Face Transformers, OpenAI API, Anthropic API, prompt engineering, RAG, AI agents, fine-tuning
- Vector databases: Qdrant, FAISS, Pinecone, ChromaDB
- ML & deep learning: PyTorch, Scikit-learn, supervised and unsupervised learning, NLP, CNN, RNN, LSTM, model evaluation (F1, ROUGE, Precision, Recall)
- Data & analytics: Pandas, NumPy, Power BI, Tableau, Excel
- MLOps & cloud: Azure, AWS, Git, Docker, Hugging Face Hub, Gradio, Jupyter, VS Code, Google Colab

## Interests
Climbing, guitar, esports, artificial intelligence, cooking.

## Guidelines
- Keep responses concise: 2 to 4 sentences max, unless the visitor asks for detail.
- When visitors ask about docusearch.eu pricing or enterprise plans, suggest they visit docusearch.eu directly or reach out via the Contact page.
- When visitors ask about working with Iassonas (consulting, prototyping, end-to-end builds), point them to the Contact page.
- You can answer general AI or technical questions briefly, but tie them back to Iassonas's relevant experience when natural.
- Do not invent facts. If you do not know something, say so and suggest the visitor reach out directly.
- Answer in the same language the visitor uses (French, English, Greek, Spanish are fine).
- Never use em dashes (—) in your responses. Use commas, periods, colons, or parentheses instead.
- Do not use bullet points or markdown formatting unless the visitor specifically asks for a list."""


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


def _extract_text(content) -> str:
    if isinstance(content, str):
        return content.strip()

    if isinstance(content, list):
        parts: list[str] = []
        for item in content:
            if isinstance(item, dict):
                text = item.get("text")
                if isinstance(text, str) and text.strip():
                    parts.append(text.strip())
                continue

            text = getattr(item, "text", None)
            if isinstance(text, str) and text.strip():
                parts.append(text.strip())

        return "\n".join(parts).strip()

    return ""


@router.post("/chat")
async def chat(request: ChatRequest):
    print(f"[CHAT] API key set: {bool(OPENAI_API_KEY)} (length: {len(OPENAI_API_KEY)})")

    if not OPENAI_API_KEY:
        raise HTTPException(status_code=503, detail="Chat is not configured.")

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in request.messages[-10:]:
        messages.append({"role": msg.role, "content": msg.content})

    print(f"[CHAT] Sending {len(messages)} messages to {OPENAI_MODEL}...")
    try:
        request_params = {
            "model": OPENAI_MODEL,
            "messages": messages,
            "reasoning_effort": OPENAI_REASONING_EFFORT,
            "verbosity": OPENAI_VERBOSITY,
            "max_completion_tokens": OPENAI_MAX_COMPLETION_TOKENS,
        }

        response = client.chat.completions.create(**request_params)
        choice = response.choices[0]
        final_choice = choice
        print(f"[CHAT] finish_reason={choice.finish_reason}")
        print(f"[CHAT] message={choice.message}")
        reply = _extract_text(choice.message.content)

        # GPT-5 can spend completion budget on reasoning tokens first.
        # Retry once with a larger budget if no visible text was emitted.
        if not reply and choice.finish_reason == "length":
            retry_tokens = max(
                OPENAI_RETRY_MAX_COMPLETION_TOKENS,
                OPENAI_MAX_COMPLETION_TOKENS * 2,
            )
            print(f"[CHAT] Empty text with finish_reason=length. Retrying with {retry_tokens} tokens...")
            retry_response = client.chat.completions.create(
                **{
                    **request_params,
                    "max_completion_tokens": retry_tokens,
                    "reasoning_effort": "minimal",
                }
            )
            retry_choice = retry_response.choices[0]
            final_choice = retry_choice
            print(f"[CHAT] retry_finish_reason={retry_choice.finish_reason}")
            print(f"[CHAT] retry_message={retry_choice.message}")
            reply = _extract_text(retry_choice.message.content)

        if not reply:
            refusal = getattr(final_choice.message, "refusal", None)
            if isinstance(refusal, str) and refusal.strip():
                reply = refusal.strip()

        if not reply:
            reply = "I could not generate a response right now. Please try again."

        print(f"[CHAT] Response received ({len(reply)} chars)")
    except Exception as e:
        print(f"[CHAT ERROR] {type(e).__name__}: {e}")
        raise HTTPException(status_code=500, detail="Chat unavailable. Please try again later.")

    return {"reply": reply}
