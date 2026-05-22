import ContactForm from '../components/ContactForm'
import styles from './Contact.module.css'

function Contact() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className={`eyebrow ${styles.eyebrow}`}>Contact</p>
        <h1 className={styles.heading}>
          Let's <em className={styles.em}>talk</em>.
        </h1>
        <p className={styles.lede}>
          Whether you're considering docusearch.eu for your team, exploring an
          AI/data project, or just curious about something on this site,
          drop me a line. I read everything and reply within a day or two.
        </p>

        <div className={styles.layout}>
          <div className={styles.formSection}>
            <ContactForm />
          </div>

          <aside className={styles.info}>
            <div className={styles.infoBlock}>
              <p className={styles.infoHead}>Direct</p>
              <a href="mailto:iasso1998@hotmail.fr">
                iasso1998@hotmail.fr
              </a>
              <a href="tel:+33768430766">+33 (0)7 68 43 07 66</a>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.infoHead}>The product</p>
              <a
                href="https://docusearch.eu"
                target="_blank"
                rel="noopener noreferrer"
              >
                docusearch.eu ↗
              </a>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.infoHead}>Elsewhere</p>
              <a
                href="https://www.linkedin.com/in/iassonas-georgakopoulos/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/iassonas-georgakopoulos ↗
              </a>
              <a
                href="https://github.com/Iassonas"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Iassonas ↗
              </a>
              <a
                href="https://iasso-gpt-chatbot-app.azurewebsites.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                iasso-gpt-chatbot demo ↗
              </a>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.infoHead}>Based in</p>
              <p>Lyon, France</p>
              <p className={styles.muted}>Open to remote engagements worldwide</p>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.infoHead}>Availability</p>
              <p>Open to collaborations</p>
              <p className={styles.muted}>Consulting · prototyping · end-to-end builds</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Contact
