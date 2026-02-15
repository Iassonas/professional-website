import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoIcon}>AI</span> Services
        </NavLink>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/services" onClick={() => setMenuOpen(false)}>Services</NavLink></li>
          <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
