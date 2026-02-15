import ContactForm from '../components/ContactForm'
import styles from './Contact.module.css'

function Contact() {
  return (
    <section className="section">
      <div className="container">
        <h1 className={styles.heading}>Get in Touch</h1>

        <div className={styles.layout}>
          <div className={styles.formSection}>
            <p className={styles.description}>
              Have a project in mind or want to discuss how AI can help your
              business? Send me a message and I'll get back to you shortly.
            </p>
            <ContactForm />
          </div>

          <div className={styles.bookingSection}>
            <h2 className={styles.bookingTitle}>Book a Session</h2>
            <p className={styles.description}>
              Prefer to schedule a call directly? Pick a time that works for you.
            </p>
            <div className={styles.calendarPlaceholder}>
              {/* Replace the div below with your Calendly or Cal.com embed */}
              {/* Example: <iframe src="https://calendly.com/your-link" ...></iframe> */}
              <div className={styles.placeholder}>
                <span>📅</span>
                <p>Calendar booking embed</p>
                <p className={styles.placeholderHint}>
                  Replace this with your Calendly or Cal.com embed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
