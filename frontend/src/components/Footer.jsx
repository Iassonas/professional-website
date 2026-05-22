import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <p className={styles.brandName}>Iassonas Georgakopoulos</p>
          <p className={styles.brandTag}>Data scientist · AI engineer · Founder of docusearch.eu</p>
        </div>

        <div className={styles.cols}>
          <div className={styles.col}>
            <p className={styles.colHead}>Site</p>
            <Link to="/">Index</Link>
            <Link to="/docusearch">Docusearch</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className={styles.col}>
            <p className={styles.colHead}>Elsewhere</p>
            <a href="https://docusearch.eu" target="_blank" rel="noopener noreferrer">docusearch.eu ↗</a>
            <a href="https://www.linkedin.com/in/iassonas-georgakopoulos/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/Iassonas" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://iasso-gpt-chatbot-app.azurewebsites.net" target="_blank" rel="noopener noreferrer">iasso-gpt demo ↗</a>
          </div>

          <div className={styles.col}>
            <p className={styles.colHead}>Contact</p>
            <a href="mailto:iasso1998@hotmail.fr">iasso1998@hotmail.fr</a>
            <span className={styles.muted}>+33 (0)7 68 43 07 66</span>
            <span className={styles.muted}>Lyon, France</span>
          </div>
        </div>
      </div>

      <div className={`container ${styles.meta}`}>
        <p>© {year} Iassonas Georgakopoulos. All rights reserved.</p>
        <p>Built with FastAPI & React. Hosted in the EU.</p>
      </div>
    </footer>
  )
}

export default Footer
