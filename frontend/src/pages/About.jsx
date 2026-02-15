import styles from './About.module.css'

const skills = [
  { category: 'AI / ML', items: ['LLMs & Prompt Engineering', 'Computer Vision', 'NLP', 'RAG Pipelines', 'Model Fine-Tuning'] },
  { category: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'REST APIs', 'PostgreSQL'] },
  { category: 'Cloud & DevOps', items: ['AWS', 'Docker', 'CI/CD', 'Kubernetes', 'Terraform'] },
  { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'] },
]

function About() {
  return (
    <section className="section">
      <div className="container">
        <h1 className={styles.heading}>About Me</h1>

        <div className={styles.intro}>
          <p>
            I'm an AI engineer passionate about bridging the gap between cutting-edge
            research and real-world applications. I help startups and enterprises
            design, prototype, and ship AI-powered products — from initial concept
            to production deployment.
          </p>
          <p>
            My approach is pragmatic: understand the business problem first, then
            apply the simplest AI solution that delivers measurable value.
          </p>
        </div>

        <h2 className={styles.sectionTitle}>Skills & Technologies</h2>
        <div className={styles.skillGrid}>
          {skills.map((group) => (
            <div key={group.category} className={styles.skillGroup}>
              <h3 className={styles.skillCategory}>{group.category}</h3>
              <ul className={styles.skillList}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
