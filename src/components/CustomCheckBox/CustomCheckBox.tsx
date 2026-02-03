import styles from './CustomCheckBox.module.scss'

interface CustomCheckBoxProps{
  onChange: () => {} | void
  name: string
  value: string
}

export const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({onChange, name, value}) =>{
  return (
    <label className={styles.switch}>
        <input className={styles.toggle} type="checkbox" onChange={onChange} name={name} value={value} />
        <span className={styles.slider}></span>
    </label>
  );
}