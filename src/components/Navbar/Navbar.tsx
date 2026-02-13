import { useEffect, useState } from 'react';
import styles from './Navbar.module.scss'
import { SearchBar } from '../SearchBar/SearchBar';
import logoDark from '/src/assets/logo-dark.png'
import logoLight from '/src/assets/logo-light.png'
import { useLocation, useNavigate } from 'react-router';
import { useCart } from '../../contexts/CartContext';
import { useSearch } from '../../contexts/SearchContext';
import { usePreferences } from '../../contexts/PreferencesContext';
import type { MenuElementModel } from '../../models/MenuElementModel';
import { fetchMenu } from '../../data/dummyDB/dbAPI';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';

export const Navbar: React.FC = () =>{
  const [menu, setMenu] = useState<MenuElementModel[]>([]);
  const [hidden, setHidden] = useState(false);

  const { preferences, toggleTheme } = usePreferences();
  const {cart} = useCart();

  const { setSearchInput } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading,setiSLoading] = useState<boolean>(true);

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  const handleSearch = (val: string) => {
    setSearchInput(val);

    setIsMobileMenuActive(false);

    if (!location.pathname.startsWith(`/${val}`)) {
      navigate(`/${val}`);
    }
  };

  useEffect(()=>{
    const loadMenu = async () => {
      setiSLoading(true);
      const response = await fetchMenu();
      setMenu(response);
      console.log("Menu: ", response);
      setiSLoading(false);
    }

    const handleScroll = () => {
      if(window.scrollY > 100){
        setHidden(true);
      }
      else{
        setHidden(false);
      }
    }

    loadMenu();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  },[])

  const handleCartPress = () => {
    setIsMobileMenuActive(false);
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

  if(isLoading){
    return <LoadingComponent text='Loading navbar...'/>
  }

  return (
    <div 
      data-testid ="nav-container"
      className={hidden ? styles.parentContainerHiddenState : styles.parentContainer}>
        <div className={styles.rowContainer}>
            <div className={styles.logoContainer}>
              <img data-testid ="nav-logo" onClick={handleLogoPress} className={styles.logo} src={preferences.theme==='dark' ? logoDark : logoLight} alt="Logo" />
            </div>
            <div className={styles.centerContainer}>
              <div className={styles.terminalLoader}>
                <div className={styles.text}>Welcome to... I mean... buy something.</div>
              </div>
            </div>
            <div className={styles.rightContainer}>
            {/*  <Button title={'Clear prefs} onClick={clearPrefferences}/> Dev button*/}
                <label className={styles.switch}>
                  <input data-testid ="theme-checkbox" className={styles.toggle} type="checkbox" checked={preferences.theme === 'dark'} onChange={handleTheme} />
                  <span className={styles.slider}></span>
                </label>
            </div>
        </div>
        <div onClick={handleMobileMenuToggle} className={styles.mobileMenuButton}>
          <a>|||</a>
        </div>
        <div className={!isMobileMenuActive ? styles.menuContainer : styles.menuContainerMobileView}>
            <SearchBar text='search' onClick={(val:string) => handleSearch(val)}/>
            {menu.map(item => {
                return (
                  <select 
                    data-testid={`nav-select-${item.title}`}
                    key={item.title} 
                    className={styles.menuElement} 
                    onChange={(e) => handleSearch(e.target.value)} 
                    value=""
                  >
                    <option className={styles.menuElement} value="" disabled>{item.title}</option>
                    {item.dropdownElements.map(i=>{
                      if(i.id === 1){
                        return;
                      }
                      else
                        return <option 
                                  className={styles.menuElement} 
                                  key={i.id} 
                                  value={i.key}>{i.title}
                                </option>
                    })
                    }
                  </select>
                );
            })}
            <div className={styles.cartContainer}>
              <button
                data-testid ="cart-button"
                className={styles.cartButton} 
                onClick={handleCartPress}>{'Cart (' + (sumCartItems() || '0') + ')'}
              </button>
            </div>
        </div>
    </div>
  )
}