import { Link } from 'react-router-dom'
import styles from './About.module.css'

const experience = [
  {
    year: 'Sep 2025 · Present',
    role: 'Data Scientist / AI Engineer',
    org: 'Elit-Technologies',
    bullets: [
      'Designed and deployed an AI Agent system that automates CRM workflows and customer support, reducing ticket response times.',
      'Built a Retrieval-Augmented Generation (RAG) pipeline with Qdrant for semantic search across company documentation and ticket history.',
      'Developed custom tools enabling the agent to run SQL queries on the production database and apply advanced filters on the vector store.',
      'Automated ticket triage, status tracking, and EoS/EoL subscription lifecycle management.',
      'Stack: LangChain, LLMs, Qdrant, SQL, production-grade Python.',
    ],
  },
  {
    year: 'Apr 2024 · Oct 2024',
    role: 'Data Scientist Intern',
    org: 'Campus Biotech, Geneva',
    bullets: [
      'Evaluated generative AI for automating medical report writing to reduce physicians’ administrative workload.',
      'Built an end-to-end NLP pipeline generating synthetic clinical reports via prompt engineering on Llama, Mistral and Command R.',
      'Fine-tuned and deployed LLMs on HPC infrastructure using Apptainer and Docker.',
      'Fine-tuned a Longformer classifier to distinguish AI-generated from expert-written reports.',
      'Benchmarked outputs with F1, BERTScore, accuracy and overlap metrics. Results contributed to an EMNLP 2025 submission.',
    ],
  },
  {
    year: '2025 · Present',
    role: 'Founder & sole engineer',
    org: 'docusearch.eu (side product)',
    bullets: [
      'Building and operating an EU-hosted, privacy-first AI document assistant.',
      'End-to-end ownership: retrieval architecture, vector indexing, frontend, infrastructure, GDPR posture.',
      'Hosted on Azure, written in Python and React.',
    ],
  },
]

const education = [
  {
    year: '2022 · 2024',
    degree: 'M.Sc. Statistics, Modeling, Data Science & Applied Mathematics',
    org: 'Université Lyon 1 (UCBL), France',
    detail:
      'Machine learning (RF, XGBoost, KNN, Isolation Forest, CNN/RNN/LSTM), statistical analysis (PCA, LDA, ARIMA), data engineering (SQL modeling, ETL).',
  },
  {
    year: '2017 · 2022',
    degree: 'B.Sc. Mathematics',
    org: 'Université Lyon 1 (UCBL), France',
    detail:
      'Theoretical mathematics with foundational programming for numerical methods (Python).',
  },
  {
    year: '2016',
    degree: 'Baccalaureate in Science',
    org: 'Lycée Franco-Hellénique, Athens, Greece',
    detail: '',
  },
]

const skills = [
  {
    category: 'GenAI & LLMs',
    items: [
      'LangChain, LlamaIndex',
      'Hugging Face Transformers',
      'OpenAI API, Anthropic API',
      'Prompt engineering, RAG, AI agents',
      'Model fine-tuning (LoRA, full)',
    ],
  },
  {
    category: 'Vector databases',
    items: ['Qdrant', 'FAISS', 'Pinecone', 'ChromaDB'],
  },
  {
    category: 'ML & deep learning',
    items: [
      'PyTorch, Scikit-learn',
      'Supervised / unsupervised learning',
      'NLP, CNN, RNN, LSTM',
      'Model evaluation (F1, ROUGE, Precision, Recall)',
    ],
  },
  {
    category: 'Languages & analytics',
    items: [
      'Python, R, SQL',
      'MATLAB, SAS',
      'Pandas, NumPy',
      'Power BI, Tableau, Excel',
    ],
  },
  {
    category: 'MLOps & cloud',
    items: [
      'Azure (App Service, AI, Storage)',
      'AWS (EC2, S3, Lambda)',
      'Docker, Git, GitHub Actions',
      'Hugging Face Hub, Gradio',
      'Jupyter, VS Code, Google Colab',
    ],
  },
  {
    category: 'Spoken languages',
    items: [
      'French (Native)',
      'Greek (Native)',
      'English (C2)',
      'Spanish (B2)',
    ],
  },
]

function About() {
  return (
    <>
      {/* ── Intro ─────────────────────────────────────── */}
      <section className={styles.intro}>
        <div className="container">
          <p className={`eyebrow ${styles.eyebrow}`}>About</p>

          <div className={styles.introGrid}>
            <div>
              <h1 className={styles.title}>
                <span>Iassonas</span>
                <span><em className={styles.em}>Georgakopoulos</em></span>
              </h1>
              <p className={styles.tagline}>
                Data scientist · AI engineer · Founder of docusearch.eu
              </p>

              <div className={styles.bio}>
                <p>
                  Data scientist and AI engineer with hands-on experience building
                  production-ready generative AI systems, including RAG pipelines,
                  LLM agents, and biomedical NLP applications. Strong foundation
                  in statistics, machine learning, and HPC-based LLM fine-tuning.
                </p>
                <p>
                  Today I work as a Data Scientist / AI Engineer at <strong>Elit-Technologies</strong>,
                  where I design and ship an AI agent system that automates CRM
                  workflows and customer support using Qdrant-powered RAG and
                  custom SQL tooling.
                </p>
                <p>
                  Alongside that, I run <Link to="/docusearch" className={styles.inlineLink}>docusearch.eu</Link>,
                  an EU-hosted, privacy-first AI document assistant for teams that
                  cannot send their files outside the EEA.
                </p>
                <p>
                  Multilingual (French, Greek, English, Spanish) and effective in
                  research-driven, collaborative teams. My work on synthetic medical
                  report generation using LLMs is currently under submission to
                  EMNLP 2025.
                </p>
              </div>

              <div className={styles.ctas}>
                <Link to="/contact" className="btn btn-primary btn-arrow">Get in touch</Link>
                <a
                  href="/Iassonas_Georgakopoulos_Resume.docx"
                  download
                  className="btn btn-outline"
                >
                  Download CV ↓
                </a>
                <a
                  href="https://docusearch.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-arrow"
                >
                  See docusearch.eu
                </a>
              </div>
            </div>

            <div className={styles.photoWrap}>
              <div className={styles.photoFrame}>
                <img
                  src="/profile.jpg"
                  alt="Iassonas Georgakopoulos"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>
              <p className={styles.photoCaption}>Lyon, France</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ───────────────────────────────── */}
      <section className={`section ${styles.experience}`}>
        <div className="container">
          <p className="eyebrow">Professional experience</p>
          <h2 className={styles.sectionHeading}>
            What I have <em className={styles.em}>built</em>.
          </h2>

          <ol className={styles.timeline}>
            {experience.map((e, i) => (
              <li key={i} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{e.year}</div>
                <div className={styles.timelineBody}>
                  <h3>
                    {e.role}
                    <span className={styles.timelineOrg}> · {e.org}</span>
                  </h3>
                  <ul className={styles.timelineBullets}>
                    {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Education ─────────────────────────────── */}
      <section className={`section ${styles.educationSection}`}>
        <div className="container">
          <p className="eyebrow">Education</p>
          <h2 className={styles.sectionHeading}>
            <em className={styles.em}>Where</em> I learned the craft.
          </h2>

          <ol className={styles.timeline}>
            {education.map((e, i) => (
              <li key={i} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{e.year}</div>
                <div className={styles.timelineBody}>
                  <h3>
                    {e.degree}
                    <span className={styles.timelineOrg}> · {e.org}</span>
                  </h3>
                  {e.detail && <p>{e.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────── */}
      <section className={`section ${styles.skillsSection}`}>
        <div className="container">
          <p className="eyebrow">Stack</p>
          <h2 className={styles.sectionHeading}>
            Tools of the <em className={styles.em}>trade</em>.
          </h2>

          <div className={styles.skillGrid}>
            {skills.map((group) => (
              <div key={group.category} className={styles.skillCard}>
                <h3>{group.category}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Publication ──────────────────────────────── */}
      <section className={`section-tight ${styles.publication}`}>
        <div className="container">
          <p className="eyebrow">Publication</p>
          <div className={styles.pubCard}>
            <p className={styles.pubTitle}>
              <em>EMeRGe-LLM: Entity-Aware Medical Report Generation from
              Synthetic Electronic Health Records Using Large Language Models.</em>
            </p>
            <p className={styles.pubAuthors}>
              Georgakopoulos, I., Rouhizadeh, H., et al.
            </p>
            <p className={styles.pubVenue}>Under submission · EMNLP 2025</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
