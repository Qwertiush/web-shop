import styles from './ContentContainer.module.scss'
import { CustomCheckBox } from '../CustomCheckBox/CustomCheckBox'
import { Item } from '../Item/Item'
import { useEffect, useState } from 'react'
import type { ProductModel } from '../../models/ProductModel'
import type { ProductType } from '../../models/ProductType'
import { LoadingComponent } from '../LoadingComponent/LoadingComponent'
import { fetchFilteredItems, fetchProductTypeByKey } from '../../data/dummyDB/dbAPI'
import type { FilteredItemsModel } from '../../models/FilteredItemsModel'

interface ContentContainerProps{
  searchPhrase: string
}

export const ContentContainer: React.FC<ContentContainerProps> = ({searchPhrase}) =>{
  
  const [items, setItems] = useState<ProductModel[]>([]);
  const [itemParams, setItemParams] = useState<ProductType>();

  const [loading, setLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const pageLimit = 6;
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const pagesButtonsSideLimit = 1;

  useEffect(()=>{

    const fetchData = async () => {
      setLoading(true);
        
      const products: FilteredItemsModel = await fetchFilteredItems(searchPhrase, {},1,pageLimit);
      setItems(products.data);
      setPageCount(products.lastPage);
      setPage(1);
      setFilters({});
      console.log(products);
      

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
    const response: FilteredItemsModel = await fetchFilteredItems(searchPhrase, filters,1,pageLimit);
    setItems(response.data);
    setPage(1);
    setPageCount(response.lastPage);
    setLoading(false); 
  };

  const handlePageChange = async (newPage: number) => {
    setLoading(true);

    const response: FilteredItemsModel = await fetchFilteredItems(
      searchPhrase,
      filters,
      newPage,
      pageLimit
    );

    setItems(response.data);
    setPage(response.page);
    setPageCount(response.lastPage);

    setLoading(false);
  };

  const handlePageChangeDecrement = () => {
    if(page > 1){
      handlePageChange(page - 1);
    }
  }

  const handlePageChangeIncrement = () => {
    if(page < pageCount){
      handlePageChange(page + 1);
    }
  }

  if(loading){
    return <LoadingComponent text='loading...'/>
  }

  const renderPageButtons = () => {
    const buttons = [];
    const sideLimit = pagesButtonsSideLimit;
    const total = pageCount;

    let leftSeparatorAdded = false;
    let rightSeparatorAdded = false;

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= page - sideLimit && i <= page + sideLimit)) {
        buttons.push(
          <button
            key={i}
            className={i === page ? styles.pageButtonActive : styles.pageButton}
            disabled={i === page}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      } else if (i < page - sideLimit && !leftSeparatorAdded) {
        buttons.push(
          <div key="sep-left" className={styles.pagesSeparator}>...</div>
        );
        leftSeparatorAdded = true;
      } else if (i > page + sideLimit && !rightSeparatorAdded) {
        buttons.push(
          <div key="sep-right" className={styles.pagesSeparator}>...</div>
        );
        rightSeparatorAdded = true;
      }
    }

  return buttons;
};



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
          <div className={styles.pageButtonsContainer}>
            <button className={styles.pageButton} onClick={handlePageChangeDecrement}>{'<'}</button>
            {renderPageButtons()}
            <button className={styles.pageButton} onClick={handlePageChangeIncrement}>{'>'}</button>
          </div>
        </div>
        <div className={styles.rightPanel}></div>
    </div>
  )
}