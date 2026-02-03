import styles from './CustomCheckBox.module.scss'

interface CustomCheckBoxProps{
  onChange: () => {} | void
}

export const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({onChange}) =>{
  return (
    <label className={styles.switch}>
        <input className={styles.toggle} type="checkbox" onChange={onChange} />
        <span className={styles.slider}></span>
    </label>
  );
}