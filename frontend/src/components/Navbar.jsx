import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} onClick={close}>
          <span className={styles.logoMark}>I</span>
          <span className={styles.logoName}>
            <span className={styles.logoNameFull}>Iassonas Georgakopoulos</span>
            <span className={styles.logoNameShort}>I. Georgakopoulos</span>
          </span>
        </Link>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <li><NavLink to="/" end onClick={close}>Index</NavLink></li>
          <li><NavLink to="/docusearch" onClick={close}>Docusearch</NavLink></li>
          <li><NavLink to="/about" onClick={close}>About</NavLink></li>
          <li><NavLink to="/contact" onClick={close} className={styles.cta}>Contact →</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
