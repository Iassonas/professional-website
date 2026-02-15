import ServiceCard from '../components/ServiceCard'
import styles from './Services.module.css'

const services = [
  {
    icon: '💡',
    title: 'AI Consulting Session',
    description:
      'One-on-one strategic sessions to evaluate your AI opportunities, identify the right approach, and build a clear roadmap for implementation.',
    features: [
      'AI feasibility assessment',
      'Technology stack recommendations',
      'Data strategy & pipeline review',
      'Actionable implementation roadmap',
    ],
  },
  {
    icon: '🧪',
    title: 'AI Proof of Concept',
    description:
      'Rapid prototyping to validate your AI idea with real data. Get a working proof of concept that demonstrates feasibility before committing to full development.',
    features: [
      'Problem scoping & data analysis',
      'Model selection & training',
      'Performance benchmarking',
      'Technical report & next steps',
    ],
  },
  {
    icon: '🚀',
    title: 'AI MVP Development',
    description:
      'End-to-end development of a minimum viable product powered by AI. From architecture to deployment — a production-ready solution your users can interact with.',
    features: [
      'Full-stack AI application',
      'API design & integration',
      'Cloud deployment & CI/CD',
      'Documentation & handoff',
    ],
  },
]

function Services() {
  return (
    <section className="section">
      <div className="container">
        <h1 className={styles.heading}>Services</h1>
        <p className={styles.subheading}>
          Choose the level of engagement that fits your needs — from a quick
          consulting call to a fully delivered AI product.
        </p>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
