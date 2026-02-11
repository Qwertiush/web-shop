import styles from './Footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <p className={styles.copyRightsContainer}>
        copyright &copy; Web-shop <span>{new Date().getFullYear()}</span>
      </p>
    </footer>
  )
}
