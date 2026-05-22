import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from project root (two levels up from this file)
env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(env_path)

APP_ENV = os.getenv("APP_ENV", "development")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
CONTACT_EMAIL = os.getenv("CONTACT_EMAIL", "iassonas.georgakopoulos@gmail.com")
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-5-mini")
OPENAI_REASONING_EFFORT = os.getenv("OPENAI_REASONING_EFFORT", "minimal")
OPENAI_VERBOSITY = os.getenv("OPENAI_VERBOSITY", "low")
OPENAI_MAX_COMPLETION_TOKENS = int(os.getenv("OPENAI_MAX_COMPLETION_TOKENS", "1200"))
OPENAI_RETRY_MAX_COMPLETION_TOKENS = int(os.getenv("OPENAI_RETRY_MAX_COMPLETION_TOKENS", "2400"))
