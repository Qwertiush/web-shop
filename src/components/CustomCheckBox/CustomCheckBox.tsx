import styles from './CustomCheckBox.module.scss'

interface CustomCheckBoxProps{
  onChange: (checked: boolean) => void
  name: string
  value: string
  checked: boolean
}

export const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({onChange, name, value, checked}) =>{
  return (
    <label className={styles.switch}>
        <input 
          className={styles.toggle} 
          type="checkbox" 
          onChange={(e) => onChange(e.target.checked)} 
          name={name} 
          value={value}
          checked={checked}
        />
        <span className={styles.slider}></span>
    </label>
  );
}