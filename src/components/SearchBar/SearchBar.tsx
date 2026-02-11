import { useState } from 'react'
import styles from './SearchBar.module.scss'

interface SearchBarProps{
  text: string
  onClick: (val:string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({text, onClick}) =>{
  const [value, setValue] = useState('');

  return (
      <form className={styles.inputContainer} onSubmit={e => { e.preventDefault(); onClick(value); }}>
        <input 
          className={styles.input} 
          placeholder={text}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button className={styles.searchBtn} onClick={()=>onClick(value)}>{'>'}</button>
      </form>
    )
}