import { Link } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {
  return (
    <section className={`section ${styles.hero}`}>
      <div className="container">
        <p className={styles.tag}>AI Engineering & Consulting</p>
        <h1 className={styles.title}>
          Turning AI Ideas into <span className={styles.highlight}>Production-Ready</span> Solutions
        </h1>
        <p className={styles.subtitle}>
          From strategic consulting to full MVP delivery — I help businesses
          leverage artificial intelligence to solve real problems and ship faster.
        </p>
        <div className={styles.cta}>
          <Link to="/services" className="btn btn-primary">Explore Services</Link>
          <Link to="/contact" className="btn btn-outline">Get in Touch</Link>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>AI</span>
            <span className={styles.statLabel}>Consulting</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>POC</span>
            <span className={styles.statLabel}>Prototyping</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>MVP</span>
            <span className={styles.statLabel}>Development</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
