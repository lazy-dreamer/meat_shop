import React, {useEffect, useState} from "react";
import {Preloader} from "./Preloader";
import {ProductService} from "../services/product.service";
import {ProductItem} from "./ProductItem";
import {ProductFilter} from "./ProductFilter";
import {AppDispatch, RootState} from "../redux/store";
import {useDispatch, useSelector} from "react-redux";

export interface ICategoryFilter {
  filterName: string;
  filterVariants: [string, string][]
}

export interface ICategorySection {
  categoryType: string | undefined;
  filters: ICategoryFilter[] | undefined;
}

export const CategorySection: React.FC<ICategorySection> = ({categoryType, filters}) => {
  let spinnerClass = '';
  
  const [productItemsArr, setProductItemsArr] = useState([]);
  const [filteredItemsArr, setFilteredItemsArr] = useState([]);
  const [selectedOption, setSelectedOption] = useState("disabledOption");
  const [spinner, setSpinner] = useState(true);
  
  const dispatch: AppDispatch = useDispatch();
  const {cartItems} = useSelector((state: RootState) => state.cart);
  
  useEffect(() => {
    let fetchedItems: any = []
    for (let key in cartItems) {
      if (cartItems[key].type.includes(categoryType)) {
        fetchedItems.push(ProductService.productItemToArr(cartItems[key]))
      }
    }
    // console.log(fetchedItems)
    setProductItemsArr(fetchedItems)
    setSpinner(false);
    filterProductsAlphabetically(fetchedItems)
  }, []);
  
  function sortingSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    let sortingSelectVal = event.target.value;
    setSelectedOption(sortingSelectVal);
    switchFilter(sortingSelectVal)
  }
  
  function switchFilter(sortingVal: string) {
    // switch (sortingVal) {
    //   case 'name_end':
    //     filterProductsReverseAlphabetically(filteredItemsArr);
    //     break;
    //   case 'price_up':
    //     sortByElementAscending(filteredItemsArr, 5)
    //     setSpinner(false);
    //     break;
    //   case 'price_down':
    //     sortByElementDescending(filteredItemsArr, 5)
    //     setSpinner(false);
    //     break;
    //   case 'weight_light':
    //     sortByElementAscending(filteredItemsArr, 6)
    //     break;
    //   case 'weight_heavy':
    //     sortByElementDescending(filteredItemsArr, 6)
    //     break;
    //   case 'disabledOption':
    //     filterProductsAlphabetically(filteredItemsArr)
    //     break;
    //   default:
    //     //name_start
    //     filterProductsAlphabetically(filteredItemsArr)
    //     break;
    // }
  }
  
  function filterProductsAlphabetically(products: any): void {
    const sortedProducts = [...products];
    
    // setFilteredItemsArr([])
    // setSpinner(true);
    //
    // sortedProducts.sort((a, b) => {
    //   const nameA = a[2].toLowerCase();
    //   const nameB = b[2].toLowerCase();
    //   if (nameA < nameB) return -1;
    //   if (nameA > nameB) return 1;
    //   return 0;
    // });
    
    // setFilteredItemsArr(sortedProducts);
    // setSpinner(false);
  }
  
  // function filterProductsReverseAlphabetically(products): void {
  //   const sortedProducts = [...products];
  //  
  //   setFilteredItemsArr([])
  //   setSpinner(true);
  //  
  //   sortedProducts.sort((a, b) => {
  //     const nameA = a[2].toLowerCase();
  //     const nameB = b[2].toLowerCase();
  //     if (nameA < nameB) return 1;
  //     if (nameA > nameB) return -1;
  //     return 0;
  //   });
  //  
  //   setFilteredItemsArr(sortedProducts);
  //   setSpinner(false);
  // }
  //
  // function sortByElementAscending(products, index: number) {
  //   const sortedProducts = [...products];
  //  
  //   setFilteredItemsArr([])
  //   setSpinner(true);
  //  
  //   sortedProducts.sort((a, b) => parseFloat(a[index]) - parseFloat(b[index]));
  //  
  //   setFilteredItemsArr(sortedProducts);
  //   setSpinner(false);
  // }
  //
  // function sortByElementDescending(products, index: number): void {
  //   const sortedProducts = [...products];
  //  
  //   setFilteredItemsArr([])
  //   setSpinner(true);
  //  
  //   sortedProducts.sort((a, b) => parseFloat(b[index]) - parseFloat(a[index]));
  //  
  //   setFilteredItemsArr(sortedProducts);
  //   setSpinner(false);
  // }
  
  function clearFilters(): void {
    // filterProductsByDependencies([], productItemsArr);
    // var inputs = document.querySelectorAll('.filtering_side .filter_checkbox');
    // for (var i = 0; i < inputs.length; i++) {
    //   inputs[i].checked = false;
    // }
  }
  
  // function filterProductsByDependencies(dependenciesList, products): void {
  // const sortedProducts = [...products];
  // let filteredProductKeys = [],
  //   filteredProducts = []
  //
  // if (dependenciesList.length === 0) {
  //   setFilteredItemsArr(productItemsArr)
  //   setSelectedOption('disabledOption')
  // } else {
  //   for (let key in sortedProducts) {
  //     for (let i in dependenciesList) {
  //       if (sortedProducts[key][7].includes(dependenciesList[i])) {
  //         if (!filteredProductKeys.includes(key)) {
  //           filteredProductKeys.push(key)
  //         }
  //       }
  //     }
  //   }
  //   for (let k in filteredProductKeys) {
  //     filteredProducts.push(sortedProducts[filteredProductKeys[k]])
  //   }
  //   setFilteredItemsArr(filteredProducts);
  //   setSelectedOption('disabledOption')
  // }
  // }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // let filterDependencies = []
    //
    // for (var key in e.target.filter_checkbox) {
    //   if (e.target.filter_checkbox[key].checked === true) {
    //     filterDependencies.push(e.target.filter_checkbox[key].value);
    //   }
    // }
    //
    // filterProductsByDependencies(filterDependencies, productItemsArr);
  };
  
  return (
    <section className="section-product-items">
      <div className="top_lighter_line lighter_bg"/>
      <div className="bg_noise"/>
      <div className="section_bg">
        <div className="screen_content">
          <div className="circulap_decor to_right">
            <img className="circulap_decor_img" src="../img/circulap_decor_img.svg" alt="ico"/>
          </div>
        </div>
      </div>
      <div className="screen_content">
        <div className="filtering_line">
          <div className="filtering_sides">
            <form className="filtering_side" onSubmit={handleSubmit}>
              {
                filters?.map((item, index) => <ProductFilter key={index} filter={item}/>)
              }
            </form>
            <div className="clear_filters_side">
              <button className="clear_filters more_btn" type="button" onClick={clearFilters}><span
                className="more_txt">Очистить фильтр</span><span className="more_btn_ico">
              <img src="../img/clear_ico.svg" alt="ico"/></span></button>
            </div>
          </div>
          <div className="price_filter">
            <div className="select_wrapper changed with_ico">
              <select className="select" value={selectedOption} name="" onChange={(e) => sortingSelect(e)}>
                <option value="disabledOption" disabled>Сортировка</option>
                <option value="name_start">Название А - Я</option>
                <option value="name_end">Название Я - А</option>
                <option value="price_up">Цена по возростанию</option>
                <option value="price_down">Цена по убыванию</option>
                <option value="weight_light">Вес - легче</option>
                <option value="weight_heavy">Вес - тяжелее</option>
              </select>
              <div className="select_ico"><img src="../img/sorting.svg" alt="ico"/></div>
            </div>
          </div>
        </div>
        <div className="product_items">
          {
            spinner ? <Preloader customClass={spinnerClass}/> : filteredItemsArr.map((item, index) => <ProductItem
              itemInfo={item} key={index}/>)
          }
        </div>
        {/*<div className="category_more_wrapper">*/}
        {/*  <button className="main_btn bordered" type="button"><span*/}
        {/*  className="main_btn_inner">Показать еще</span></button>*/}
        {/*</div>*/}
      </div>
    </section>
  )
}