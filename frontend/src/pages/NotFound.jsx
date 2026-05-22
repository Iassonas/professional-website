import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <section className={styles.section}>
      <div className="container-narrow">
        <p className={`eyebrow ${styles.eyebrow}`}>404</p>
        <h1 className={styles.heading}>
          That page <em className={styles.em}>doesn't exist</em>.
        </h1>
        <p className={styles.lede}>
          The link may be broken, the page may have moved, or you may have
          mistyped the URL. Try one of these instead.
        </p>

        <ul className={styles.links}>
          <li><Link to="/">Index</Link></li>
          <li><Link to="/docusearch">docusearch.eu</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </section>
  )
}

export default NotFound
