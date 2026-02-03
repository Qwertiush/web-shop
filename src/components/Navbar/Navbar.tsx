import { useEffect, useState } from 'react';
import styles from './Navbar.module.scss'
import { menuElements } from '../../data/menuElements';
import { SearchBar } from '../SearchBar/SearchBar';
import logoDark from '/src/assets/logo-dark.png'
import logoLight from '/src/assets/logo-light.png'
import { Button } from '../Button/Button';
import { useLocation, useNavigate } from 'react-router';
import { useCart } from '../../contexts/CartContext';
import { useSearch } from '../../contexts/SearchContext';
import { usePreferences } from '../../contexts/PreferencesContext';

export const Navbar: React.FC = () =>{
  const [hidden, setHidden] = useState(false);

  const { preferences, toggleTheme } = usePreferences();
  const {cart} = useCart();

  const { setSearchInput } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (val: string) => {
    setSearchInput(val);

    if (!location.pathname.startsWith(`/${val}`)) {
      navigate(`/${val}`);
    }
  };

  useEffect(()=>{
    const handleScroll = () => {
      if(window.scrollY > 100){
        setHidden(true);
      }
      else{
        setHidden(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  },[])

  const handleCartPress = () => {
    navigate('/cart');
  }

  const sumCartItems = (): number => {
    return Object.values(cart).reduce((sum, currentVal) => sum + currentVal,0);
  }

  const handleTheme = () => {
    toggleTheme();
  }

  const handleLogoPress = () => {
    navigate('/');
  }

  return (
    <div className={hidden ? styles.parentContainerHiddenState : styles.parentContainer}>
        <div className={styles.rowContainer}>
            <div className={styles.logoContainer}>
              <img onClick={handleLogoPress} className={styles.logo} src={preferences.theme==='dark' ? logoDark : logoLight} alt="Logo" />
            </div>
            <div className={styles.centerContainer}>
              <div className={styles.terminalLoader}>
                <div className={styles.text}>Welcome to... I mean... buy something.</div>
              </div>
            </div>
            <div className={styles.rightContainer}>
            {/*  <Button title={'Clear prefs} onClick={clearPrefferences}/> Dev button*/}
                <label className={styles.switch}>
                  <input className={styles.toggle} type="checkbox" checked={preferences.theme === 'dark'} onChange={handleTheme} />
                  <span className={styles.slider}></span>
                </label>
            </div>
        </div>
        <div className={styles.menuContainer}>
            <SearchBar text='search' onClick={(val:string) => handleSearch(val)}/>
            {menuElements.map(item => {
                return (
                  <select key={item.title} className={styles.menuElement} onChange={(e) => handleSearch(e.target.value)} value="">
                    <option className={styles.menuElement} value="" disabled>{item.title}</option>
                    {item.dropdownElements.map(i=>{
                      return <option className={styles.menuElement} key={i.id} value={i.title}>{i.title}</option>
                    })
                    }
                  </select>
                );
            })}
            <div className={styles.cartContainer}>
              <Button title={'Cart ' + (sumCartItems() || '')} onClick={handleCartPress}/>
            </div>
        </div>
    </div>
  )
}