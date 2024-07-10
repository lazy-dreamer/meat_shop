import React, {useContext, useEffect, useState} from "react";
import {Preloader} from "../Preloader";
import {ProductService} from "../../services/product.service";
import {ProductItem} from "../ProductItem";
import {ProductFilter} from "../ProductFilter";
import {CartContext} from "../../providers/CartProvider";

export function CategorySection({categoryType, filters}) {
  let spinnerClass = '';
  
  const [ productItemsArr, setProductItemsArr ] = useState([]);
  const [ filteredItemsArr, setFilteredItemsArr ] = useState([]);
  const [ selectedOption, setSelectedOption ] = useState("disabledOption");
  const [ spinner, setSpinner ] = useState(true);

  const { products } = useContext(CartContext);

  useEffect(() => {
    let fetchedItems = []
    for (let key in products) {
      if(products[key].type.includes(categoryType)) {
        fetchedItems.push(ProductService.productItemToArr(products[key]))
      }
    }
    setProductItemsArr(fetchedItems)
    setSpinner(false);
    filterProductsAlphabetically(fetchedItems)
  }, []);

  function sortingSelect(event){
    let sortingSelectVal = event.target.value;
    setSelectedOption(sortingSelectVal);
    switchFilter(sortingSelectVal)
  }
  
  function switchFilter(sortingVal) {
    switch(sortingVal) {
      case 'name_end':
        filterProductsReverseAlphabetically(filteredItemsArr);
        break;
      case 'price_up':
        sortByElementAscending(filteredItemsArr, 5)
        setSpinner(false);
        break;
      case 'price_down':
        sortByElementDescending(filteredItemsArr, 5)
        setSpinner(false);
        break;
      case 'weight_light':
        sortByElementAscending(filteredItemsArr, 6)
        break;
      case 'weight_heavy':
        sortByElementDescending(filteredItemsArr, 6)
        break;
      case 'disabledOption':
        filterProductsAlphabetically(filteredItemsArr)
        break;
      default:
        //name_start
        filterProductsAlphabetically(filteredItemsArr)
        break;
    }
  }
  
  function filterProductsAlphabetically(products) {
    const sortedProducts = [...products];

    setFilteredItemsArr([])
    setSpinner(true);

    sortedProducts.sort((a, b) => {
      const nameA = a[2].toLowerCase();
      const nameB = b[2].toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    setFilteredItemsArr(sortedProducts);
    setSpinner(false);
  }
  function filterProductsReverseAlphabetically(products) {
    const sortedProducts = [...products];

    setFilteredItemsArr([])
    setSpinner(true);

    sortedProducts.sort((a, b) => {
      const nameA = a[2].toLowerCase();
      const nameB = b[2].toLowerCase();
      if (nameA < nameB) return 1;
      if (nameA > nameB) return -1;
      return 0;
    });

    setFilteredItemsArr(sortedProducts);
    setSpinner(false);
  }
  function sortByElementAscending(products, index) {
    const sortedProducts = [...products];

    setFilteredItemsArr([])
    setSpinner(true);
    
    sortedProducts.sort((a, b) => parseFloat(a[index]) - parseFloat(b[index]));
    
    setFilteredItemsArr(sortedProducts);
    setSpinner(false);
  }
  function sortByElementDescending(products, index) {
    const sortedProducts = [...products];

    setFilteredItemsArr([])
    setSpinner(true);

    sortedProducts.sort((a, b) => parseFloat(b[index]) - parseFloat(a[index]));
    
    setFilteredItemsArr(sortedProducts);
    setSpinner(false);
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    let filterDependencies = []
    
    for (var key in e.target.filter_checkbox) {
      if (e.target.filter_checkbox[key].checked === true) {
        filterDependencies.push(e.target.filter_checkbox[key].value);
      }
    }
    
    filterProductsByDependencies(filterDependencies, productItemsArr);
  };
  
  function clearFilters() {
    filterProductsByDependencies([], productItemsArr);
    var inputs = document.querySelectorAll('.filtering_side .filter_checkbox');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
  }
  
  function filterProductsByDependencies(dependenciesList, products) {
    const sortedProducts = [...products];
    let filteredProductKeys = [],
      filteredProducts = []

    if (dependenciesList.length === 0) {
      setFilteredItemsArr(productItemsArr)
      setSelectedOption('disabledOption')
    } else {
      for (let key in sortedProducts) {
        for (let i in dependenciesList) {
          if (sortedProducts[key][7].includes(dependenciesList[i])) {
            if (!filteredProductKeys.includes(key)) {
              filteredProductKeys.push(key)
            } 
          }
        }
      }
      for (let k in filteredProductKeys) {
        filteredProducts.push(sortedProducts[filteredProductKeys[k]])
      }
      setFilteredItemsArr(filteredProducts);
      setSelectedOption('disabledOption')
    }
  }
  
  // console.log()
  return (
    <section className="section-product-items">
      <div className="top_lighter_line lighter_bg" />
      <div className="bg_noise" />
      <div className="section_bg">
        <div className="screen_content">
          <div className="circulap_decor to_right"><img className="circulap_decor_img" src="../img/circulap_decor_img.svg" alt="ico"/></div>
        </div>
      </div>
      <div className="screen_content">
        <div className="filtering_line">
          <div className="filtering_sides">
            <form className="filtering_side" onSubmit={handleSubmit}>
              {
                filters.map((item, index) => <ProductFilter key={index} filter={item} />)
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
            spinner ? <Preloader customClass={spinnerClass} /> : filteredItemsArr.map((item, index) => <ProductItem itemInfo={item} key={index} />)
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