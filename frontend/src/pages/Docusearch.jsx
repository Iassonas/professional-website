import { Link } from 'react-router-dom'
import styles from './Docusearch.module.css'

const features = [
  {
    title: 'EU-only data residency',
    body:
      'Documents, embeddings and inference all stay on European infrastructure. No transfers outside the EEA, by design, not by checkbox.',
  },
  {
    title: 'Grounded, cited answers',
    body:
      'Every response cites the exact source documents and passages it used. Hallucinations are surfaced as missing context, not confident guesses.',
  },
  {
    title: 'Built for sensitive files',
    body:
      'Contracts, medical reports, internal policies, research data. Encryption in transit and at rest, with workspace-level access controls.',
  },
  {
    title: 'Teams & roles',
    body:
      'Invite teammates, scope access by folder, audit every query. Built for groups that already know they need GDPR-grade governance.',
  },
  {
    title: 'Bring your own files',
    body:
      'PDF, DOCX, Markdown, PPTX, scanned images with OCR. Reindex automatically on update. No format gymnastics.',
  },
  {
    title: 'Open architecture',
    body:
      'Built on a modern RAG stack: vector search, hybrid retrieval, reranking. Custom models and on-prem deployment available for enterprise.',
  },
]

const useCases = [
  {
    no: '01',
    title: 'Legal & compliance',
    body:
      'Search across hundreds of contracts, find clauses by intent ("indemnification caps under €1M"), and get cited extracts back. Save days of manual review.',
  },
  {
    no: '02',
    title: 'Research & academia',
    body:
      'A second brain across your paper library. Ask "what methods did we use for sample selection?" and get answers grounded in your own corpus.',
  },
  {
    no: '03',
    title: 'Internal knowledge bases',
    body:
      'Onboard new hires with an AI that has actually read your handbook, runbooks, and architecture docs, not a generic model that guesses.',
  },
]

const faqs = [
  {
    q: 'Where exactly is my data stored?',
    a: 'On EU-based cloud infrastructure (currently France and Germany). Vector embeddings, document storage and LLM inference all run within the EEA. No data is sent to non-EU providers.',
  },
  {
    q: 'Which LLMs do you use?',
    a: 'We use European-hosted models for inference by default. Enterprise customers can bring their own: open-source models running on dedicated infrastructure, or self-hosted endpoints.',
  },
  {
    q: 'Is it GDPR-compliant?',
    a: 'Yes. The architecture is built to meet GDPR requirements end-to-end: data residency, processing transparency, deletion rights, and a Data Processing Agreement available on request.',
  },
  {
    q: 'How accurate is the AI?',
    a: 'Every answer is grounded in your documents and includes citations. When the source material does not contain the answer, the system says so rather than guessing. Accuracy depends on document quality, but you always see where each statement came from.',
  },
  {
    q: 'Can I self-host or run on-premise?',
    a: 'Yes. Enterprise plans include on-premise deployment and air-gapped configurations. Get in touch for a deployment plan.',
  },
]

function Docusearch() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="container">
          <p className={`eyebrow ${styles.eyebrow}`}>Featured product · 2025</p>

          <h1 className={styles.title}>
            <span>The AI that knows</span>
            <span><em className={styles.em}>your</em> documents.</span>
          </h1>

          <p className={styles.lede}>
            <strong>docusearch.eu</strong> is a privacy-first AI document assistant
            hosted entirely in the European Union. Upload your files, chat with an
            AI that has read all of them, and get answers grounded in real sources,
            with citations.
          </p>

          <div className={styles.heroCtas}>
            <a
              href="https://docusearch.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-arrow"
            >
              Visit docusearch.eu
            </a>
            <Link to="/contact" className="btn btn-outline btn-arrow">
              Talk about a deployment
            </Link>
          </div>

          <div className={styles.heroMeta}>
            <div>
              <p className="eyebrow">Hosted in</p>
              <p className={styles.metaValue}>🇪🇺 European Union</p>
            </div>
            <div>
              <p className="eyebrow">Compliance</p>
              <p className={styles.metaValue}>GDPR-grade</p>
            </div>
            <div>
              <p className="eyebrow">Architecture</p>
              <p className={styles.metaValue}>Retrieval-augmented (RAG)</p>
            </div>
            <div>
              <p className="eyebrow">Status</p>
              <p className={styles.metaValue}>Live · accepting users</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────── */}
      <section className={`section ${styles.howSection} surface-dark`}>
        <div className="container">
          <p className="eyebrow" style={{ color: 'var(--color-on-dark-muted)' }}>How it works</p>
          <h2 className={styles.sectionHeading}>
            Three steps from <em className={styles.em}>file</em> to <em className={styles.em}>answer</em>.
          </h2>

          <ol className={styles.steps}>
            <li>
              <p className={styles.stepNo}>01</p>
              <h3>Upload</h3>
              <p>
                Drag in PDFs, Word docs, Markdown, slides, even scanned images.
                Files are encrypted, parsed and indexed inside the EU, never sent
                to third-party APIs outside the EEA.
              </p>
            </li>
            <li>
              <p className={styles.stepNo}>02</p>
              <h3>Index</h3>
              <p>
                A hybrid retrieval pipeline builds semantic and lexical indexes
                over your corpus. Reranking surfaces the passages that actually
                answer the question, not just the ones that share keywords.
              </p>
            </li>
            <li>
              <p className={styles.stepNo}>03</p>
              <h3>Ask</h3>
              <p>
                Chat with the assistant. Each answer is grounded in retrieved
                passages and cites the exact source: page, section, file. If the
                answer isn't in your documents, the assistant says so.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────── */}
      <section className={`section ${styles.featuresSection}`}>
        <div className="container">
          <div className={styles.featuresHeader}>
            <p className="eyebrow">What you get</p>
            <h2 className={styles.sectionHeading}>
              Designed for the documents you can't <em className={styles.em}>send anywhere</em>.
            </h2>
          </div>

          <div className={styles.featureGrid}>
            {features.map((f) => (
              <article key={f.title} className={styles.featureCard}>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use cases ──────────────────────────────────── */}
      <section className={`section ${styles.useCases}`}>
        <div className="container">
          <p className="eyebrow">Who it's for</p>
          <h2 className={styles.sectionHeading}>Built for <em className={styles.em}>knowledge work</em>.</h2>

          <div className={styles.useCaseGrid}>
            {useCases.map((u) => (
              <div key={u.no} className={styles.useCaseCard}>
                <p className={styles.useCaseNo}>{u.no}</p>
                <h3>{u.title}</h3>
                <p>{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────── */}
      <section className={`section ${styles.faqSection}`}>
        <div className="container-narrow">
          <p className="eyebrow">Questions</p>
          <h2 className={styles.sectionHeading}>Most common questions.</h2>

          <div className={styles.faqList}>
            {faqs.map((f, i) => (
              <details key={i} className={styles.faqItem}>
                <summary>
                  <span>{f.q}</span>
                  <span className={styles.faqIcon}>+</span>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className={`section ${styles.cta}`}>
        <div className="container-narrow">
          <h2 className={styles.ctaHeading}>
            Sensitive documents deserve a <em className={styles.em}>sensitive</em> AI.
          </h2>
          <p className={styles.ctaBody}>
            Try docusearch.eu today, or talk to me directly about a custom or
            enterprise deployment, including self-hosted and on-prem.
          </p>
          <div className={styles.ctaButtons}>
            <a
              href="https://docusearch.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-arrow"
            >
              Visit docusearch.eu
            </a>
            <Link to="/contact" className="btn btn-outline btn-arrow">
              Contact me
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Docusearch
