import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const projects = [
  {
    no: '01',
    name: 'docusearch.eu',
    year: '2025 · present',
    role: 'Founder & sole engineer',
    blurb:
      'EU-hosted, privacy-first AI document assistant. Upload your files and chat with an AI that knows their contents. Your data never leaves European soil.',
    tags: ['RAG', 'Vector search', 'Azure', 'GDPR'],
    href: '/docusearch',
    external: false,
    featured: true,
  },
  {
    no: '02',
    name: 'AI Agent system at Elit-Technologies',
    year: 'Sep 2025 · present',
    role: 'Data Scientist / AI Engineer',
    blurb:
      'Production AI agent automating CRM workflows and customer support. Qdrant-powered RAG over company documentation and ticket history, custom tools for SQL queries on the production database, automated ticket triage and EoS/EoL lifecycle management.',
    tags: ['LangChain', 'Qdrant', 'SQL', 'Production'],
    href: '/contact',
    external: false,
    featured: false,
  },
  {
    no: '03',
    name: 'EMeRGe-LLM · Campus Biotech, Geneva',
    year: 'Apr 2024 · Oct 2024',
    role: 'Data Scientist Intern',
    blurb:
      'End-to-end NLP pipeline generating synthetic clinical reports via prompt engineering on Llama, Mistral and Command R. Fine-tuned LLMs on HPC infrastructure with Apptainer and Docker. Paper under submission at EMNLP 2025.',
    tags: ['LLM fine-tuning', 'HPC', 'Biomedical NLP', 'EMNLP 2025'],
    href: '/contact',
    external: false,
    featured: false,
  },
]

const skillGroups = [
  {
    title: 'Machine learning & data science',
    items: ['LLM fine-tuning', 'NLP & generation', 'Statistical modelling', 'Experimentation'],
  },
  {
    title: 'LLM applications',
    items: ['RAG systems', 'AI agents', 'Vector databases', 'Prompt engineering'],
  },
  {
    title: 'Cloud & infrastructure',
    items: ['Azure (App Service, AI)', 'AWS', 'Docker & CI/CD', 'Observability'],
  },
]

function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="container">
          <p className={`eyebrow ${styles.eyebrow}`}>Lyon, France · Available for new work</p>

          <h1 className={styles.heading}>
            <span className={styles.headingLine}>Data scientist</span>
            <span className={styles.headingLine}>
              building <em className={styles.em}>practical</em>
            </span>
            <span className={styles.headingLine}>
              AI products<span className={styles.dot}>.</span>
            </span>
          </h1>

          <div className={styles.heroBottom}>
            <p className={styles.lede}>
              I'm Iassonas, founder of <Link to="/docusearch" className={styles.lederLink}>docusearch.eu</Link>
              {' '}and Data Scientist / AI Engineer at Elit-Technologies.
              I design and ship RAG systems, AI agents and LLM applications
              for teams that need real outcomes, not demos.
            </p>

            <div className={styles.heroCtas}>
              <Link to="/docusearch" className="btn btn-primary btn-arrow">See the product</Link>
              <Link to="/contact" className="btn btn-ghost btn-arrow">Get in touch</Link>
            </div>
          </div>
        </div>

        <div className={styles.heroMarquee} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className={styles.marqueeInner}>
                <span>Retrieval-augmented generation</span><span>·</span>
                <span>Vector search</span><span>·</span>
                <span>LLM fine-tuning</span><span>·</span>
                <span>AI agents</span><span>·</span>
                <span>Azure AI</span><span>·</span>
                <span>GDPR-grade privacy</span><span>·</span>
                <span>Biomedical NLP</span><span>·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured product: docusearch ──────────────────── */}
      <section className={`section ${styles.featured} surface-dark`}>
        <div className="container">
          <div className={styles.featuredGrid}>
            <div className={styles.featuredCopy}>
              <p className="eyebrow" style={{ color: 'var(--color-on-dark-muted)' }}>
                Featured product
              </p>
              <h2 className={styles.featuredHeading}>
                docusearch.eu
              </h2>
              <p className={styles.featuredTagline}>
                The privacy-first AI document assistant, hosted entirely in the EU.
              </p>
              <p className={styles.featuredBody}>
                Drop in your documents (contracts, research, manuals, anything) and
                chat with an AI that has read all of them. Answers are grounded in
                your files, with citations. Built on a retrieval-augmented architecture
                that keeps your data on European infrastructure end to end.
              </p>

              <ul className={styles.featuredList}>
                <li><strong>EU-only data.</strong> No transfers outside the EEA.</li>
                <li><strong>Grounded answers.</strong> Every response cites the source document.</li>
                <li><strong>Built for teams.</strong> Workspaces, roles, audit trail.</li>
              </ul>

              <div className={styles.featuredCtas}>
                <Link to="/docusearch" className="btn btn-primary btn-arrow">Learn more</Link>
                <a
                  href="https://docusearch.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.featuredLink}
                >
                  Visit docusearch.eu ↗
                </a>
              </div>
            </div>

            <div className={styles.featuredVisual} aria-hidden="true">
              <div className={styles.mockBrowser}>
                <div className={styles.mockBar}>
                  <span /><span /><span />
                  <div className={styles.mockUrl}>docusearch.eu</div>
                </div>
                <div className={styles.mockBody}>
                  <div className={styles.mockSidebar}>
                    <p className={styles.mockSidebarHead}>Library</p>
                    <ul>
                      <li>📄 contract-v3.pdf</li>
                      <li>📄 product-spec.md</li>
                      <li>📄 audit-report.pdf</li>
                      <li>📄 board-deck.pptx</li>
                    </ul>
                  </div>
                  <div className={styles.mockChat}>
                    <div className={styles.mockUser}>
                      What are the indemnification terms in contract v3?
                    </div>
                    <div className={styles.mockAssistant}>
                      <p>The supplier indemnifies up to <strong>2× annual fees</strong>,
                      capped at <strong>€500k</strong>, excluding consequential damages.</p>
                      <p className={styles.mockCite}>📎 contract-v3.pdf · §12.4</p>
                    </div>
                    <div className={styles.mockTyping}>
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Selected work ──────────────────────────────── */}
      <section className={`section ${styles.work}`}>
        <div className="container">
          <div className={styles.workHeader}>
            <p className="eyebrow">Selected work</p>
            <h2 className={styles.workHeading}>
              <em className={styles.em}>Shipped</em>, not shelved.
            </h2>
          </div>

          <ol className={styles.workList}>
            {projects.map((p) => (
              <li key={p.no} className={styles.workItem}>
                <Link to={p.href} className={styles.workLink}>
                  <div className={styles.workNo}>{p.no}</div>
                  <div className={styles.workMain}>
                    <h3 className={styles.workName}>
                      {p.name}
                      {p.featured && <span className={styles.workBadge}>featured</span>}
                    </h3>
                    <p className={styles.workBlurb}>{p.blurb}</p>
                    <ul className={styles.workTags}>
                      {p.tags.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                  <div className={styles.workMeta}>
                    <p className={styles.workYear}>{p.year}</p>
                    <p className="muted">{p.role}</p>
                    <span className={styles.workArrow}>↗</span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Skills snapshot ─────────────────────────── */}
      <section className={`section ${styles.skills}`}>
        <div className="container">
          <div className={styles.skillsGrid}>
            <div>
              <p className="eyebrow">Capabilities</p>
              <h2 className={styles.skillsHeading}>
                Full stack, <em className={styles.em}>data-first</em>.
              </h2>
              <p className={styles.skillsLede}>
                From raw data to deployed product. Pipelines, modelling, retrieval,
                and the cloud infrastructure to run it reliably.
              </p>
              <Link to="/about" className="btn btn-outline btn-arrow">More about me</Link>
            </div>

            <div className={styles.skillsCols}>
              {skillGroups.map((g) => (
                <div key={g.title} className={styles.skillCard}>
                  <h3 className={styles.skillTitle}>{g.title}</h3>
                  <ul>
                    {g.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ─────────────────────────────── */}
      <section className={`section ${styles.cta}`}>
        <div className="container-narrow">
          <p className="eyebrow">Let's talk</p>
          <h2 className={styles.ctaHeading}>
            Have a data or AI project that needs to <em className={styles.em}>actually ship</em>?
          </h2>
          <p className={styles.ctaBody}>
            I take on a small number of engagements at a time. Consulting,
            prototyping, or end-to-end builds. Tell me what you're working on.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className="btn btn-primary btn-arrow">Start a conversation</Link>
            <a href="mailto:iasso1998@hotmail.fr" className="btn btn-ghost">
              iasso1998@hotmail.fr
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
