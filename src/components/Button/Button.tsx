import styles from './Button.module.scss'

interface ButtonProps{
  title: string
  onClick: () => {} | void
}

export const Button: React.FC<ButtonProps> = ({title, onClick}) =>{
  return <button className={styles.button} onClick={onClick}>{title}</button>
}