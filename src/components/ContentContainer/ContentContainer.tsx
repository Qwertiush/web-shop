import styles from './ContentContainer.module.scss'
import { CustomCheckBox } from '../CustomCheckBox/CustomCheckBox'
import { Item } from '../Item/Item'
import { useEffect, useState } from 'react'
import type { ProductModel } from '../../models/ProductModel'
import type { ProductType } from '../../models/ProductType'
import { LoadingComponent } from '../LoadingComponent/LoadingComponent'
import { getFilteredItems, getItems, getItemsParams } from '../../data/dummyDB/dbAPI'
import { useNavigate } from 'react-router'

interface ContentContainerProps{
  searchPhrase: string
}

export const ContentContainer: React.FC<ContentContainerProps> = ({searchPhrase}) =>{
  
  const [items, setItems] = useState<ProductModel[]>([]);
  const [itemParams, setItemParams] = useState<ProductType>();

  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(()=>{

      const getData = () => {
        setItems(getItems(searchPhrase));
        setItemParams(getItemsParams(searchPhrase));
        setLoading(false);
      }
      getData();

  },[searchPhrase]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 🚫 stop reload
    console.log('submit without reload');

    const formData = new FormData(e.currentTarget);
    const result: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      result[key] = value.toString();
    }
    setItems(getFilteredItems(result, itemParams, searchPhrase));
  };

  const handleProductPress = (item: ProductModel) => {
    console.log(item.title + " pressed");

    navigate(`/product/${item.id}`);
  }

  if(loading){
    return <LoadingComponent text='loading...'/>
  }

  return (
    <div className={styles.parentContainer}>
        <form className={styles.leftPanel} onSubmit={handleSubmit}>
            {itemParams?.productParameters.map((item)=>{
              if(item.type == 'dropdown'){
                return (
                  <select key={item.id} className={styles.dropdownMenuElementContainer} name={item.id} defaultValue="">
                    <option className={styles.menuElement} value="">{item.name}</option>
                    {item.values?.map((v,index)=>{
                      return <option key={index} className={styles.dropdownMenuElement}>{v}</option>
                    })}
                  </select>
                )
              }
              else if(item.type == 'input'){
                return <input key={item.id} className={styles.inputMenuElement} placeholder={item.name} name={item.id} type='number'/>
              }
              else{
                return <div key={item.id} className={styles.checkBoxMenuElement}>{item.name}<CustomCheckBox onChange={()=>{}}/></div> //TODO: rozbudować o obsłógę name={item.id}
              }
            })}
            <button type='submit'>Submit</button>
        </form>
        <div className={styles.centerPanel}>
          <div className={styles.productsParent}>
              {items.map(item => {                
                  return (
                    <Item key={item.id} item={item} onClick={()=>handleProductPress(item)}/> //TODO use a href not div
                  );
              })}
            </div>
        </div>
        <div className={styles.rightPanel}></div>
    </div>
  )
}