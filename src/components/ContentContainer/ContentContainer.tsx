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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const result: Record<string, string[]> = {};

    for (const [key, value] of formData.entries()) {
      if (value === '') continue;
      
      if(!result[key]){
        result[key] = [];
      }
      result[key].push(value.toString());
    }

    setLoading(true);

    const response = await fetchFilteredItems(searchPhrase, result);
    console.log(response);
    
    setItems(response);

    setLoading(false);
    
  };

  if(loading){
    return <LoadingComponent text='loading...'/>
  }

  return (
    <div className={styles.parentContainer}>
        <form className={styles.leftPanel} onSubmit={handleSubmit}>
            {itemParams?.parameters.map((item)=>{
              if(item.type == 'dropdown'){
                return (
                  <select key={item.id} className={styles.dropdownMenuElementContainer} name={item.id.toString()} defaultValue="">
                    <option className={styles.menuElement} value="">{item.name}</option>
                    {item.values?.map((v,index)=>{
                      return <option key={index} className={styles.dropdownMenuElement}>{v.value}</option>
                    })}
                  </select>
                )
              }
              else if(item.type == 'input'){
                return <input key={item.id} className={styles.inputMenuElement} placeholder={item.name} name={item.id.toString()} type='number'/>
              }
              else{
                return <div key={item.id} className={styles.checkBoxMenuParent}>
                  <p>{item.name}</p>
                  {item.values?.map(v => (
                  <div key={v.id} className={styles.checkBoxMenuElement}>
                    {v.value}
                    <CustomCheckBox onChange={() => {}} name={item.id.toString()} value={v.value} />
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