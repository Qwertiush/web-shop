import styles from './ContentContainer.module.scss'
import { CustomCheckBox } from '../CustomCheckBox/CustomCheckBox'
import { Item } from '../Item/Item'
import { useEffect, useState } from 'react'
import type { ProductModel } from '../../models/ProductModel'
import type { ProductType } from '../../models/ProductType'
import { LoadingComponent } from '../LoadingComponent/LoadingComponent'
import { fetchAllProductsByTypeKey, fetchFilteredItems, fetchProductTypeByKey } from '../../data/dummyDB/dbAPI'

interface ContentContainerProps{
  searchPhrase: string
}

export const ContentContainer: React.FC<ContentContainerProps> = ({searchPhrase}) =>{
  
  const [items, setItems] = useState<ProductModel[]>([]);
  const [itemParams, setItemParams] = useState<ProductType>();

  const [loading, setLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  useEffect(()=>{

    const fetchData = async () => {
      setLoading(true);
        
      const products = await fetchAllProductsByTypeKey(searchPhrase);
      setItems(products);
      const type = await fetchProductTypeByKey(searchPhrase);
      console.log(type);
        
      setItemParams(type);

      setLoading(false);
    }

      fetchData();

  },[searchPhrase]);

  const handleFilterChange = (
    name: string,
    value: string,
    checked?: boolean
  ) => {
    setFilters(prev => {
      const updated = { ...prev };

      if (!updated[name]) updated[name] = [];

      if (checked === undefined) {
        updated[name] = value ? [value] : [];
      } else {
        if (checked) {
          if (!updated[name].includes(value)) {
            updated[name] = [...updated[name], value];
          }
        } else {
          updated[name] = updated[name].filter(v => v !== value);
        }
      }

      return updated;
    });
  };


  const handleMobileMenuToggle = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsMobileMenuActive(false);

    setLoading(true);
    const response = await fetchFilteredItems(searchPhrase, filters);
    setItems(response);
    setLoading(false); 
  };

  if(loading){
    return <LoadingComponent text='loading...'/>
  }

  return (
    <div className={styles.parentContainer}>
        <div onClick={handleMobileMenuToggle} className={styles.leftPanelmobileMenuButton}>
          <a>Filter parameters</a>
        </div>
        <form className={!isMobileMenuActive ? styles.leftPanel : styles.leftPanelMobileView} onSubmit={handleSubmit}>
            {itemParams?.parameters.map((item)=>{
              if(item.type == 'dropdown'){
                return (
                  <select 
                    key={item.id} 
                    className={styles.dropdownMenuElementContainer} 
                    name={item.id.toString()} 
                    value={filters[item.id]?.[0] || ""}
                    onChange={(e) => handleFilterChange(item.id.toString(), e.target.value)}
                  >
                    <option className={styles.menuElement} value="">{item.name}</option>
                    {item.values?.map((v,index)=>{
                      return <option key={index} className={styles.dropdownMenuElement}>{v.value}</option>
                    })}
                  </select>
                )
              }
              else if(item.type == 'input'){
                return (
                  <input 
                    key={item.id} 
                    className={styles.inputMenuElement} 
                    placeholder={item.name} 
                    name={item.id.toString()} 
                    type='number'
                    value={filters[item.id]?.[0] || ""}
                    onChange={(e) => handleFilterChange(item.id.toString(), e.target.value)}
                  />)
              }
              else{
                return <div key={item.id} className={styles.checkBoxMenuParent}>
                  <p>{item.name}</p>
                  {item.values?.map(v => (
                  <div key={v.id} className={styles.checkBoxMenuElement}>
                    {v.value}
                    <CustomCheckBox 
                      name={item.id.toString()} 
                      value={v.value}
                      checked={filters[item.id]?.includes(v.value) || false}
                      onChange={(checked) => handleFilterChange(item.id.toString(), v.value, checked)}
                    />
                  </div>
                ))}
                </div>
              }
            })}
            <br/>
            <button className={styles.button} type='submit'>Submit</button>
        </form>
        <div className={styles.centerPanel}>
          <div className={styles.productsParent}>
              {items.map(item => {                
                  return (
                    <Item key={item.id} item={item} href={`/product/${item.id}`}/>
                  );
              })}
          </div>
        </div>
        <div className={styles.rightPanel}></div>
    </div>
  )
}