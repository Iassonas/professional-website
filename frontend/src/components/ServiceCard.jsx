import styles from './ServiceCard.module.css'

function ServiceCard({ icon, title, description, features }) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {features && (
        <ul className={styles.features}>
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ServiceCard
