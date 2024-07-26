import React, {useEffect, useRef, useState} from "react";
import {Preloader} from "./Preloader";
import {IProductArr, ProductService} from "../services/product.service";
import {ProductItem} from "./ProductItem";
import {ProductFilter} from "./ProductFilter";
import {TProductItemArr} from "./MainPageProductItems";
import Select, {SelectInstance} from "react-select";

export interface ICategoryFilter {
  filterName: string;
  filterVariants: [string, string][]
}

export interface ICategorySection {
  categoryType: string | undefined;
  filters: ICategoryFilter[] | undefined;
}

export interface ISelectOption {
  value: string;
  label: string
}

const options = [
  {value: 'disabledOption', label: 'Сортировка', isDisabled: true},
  {value: 'name_start', label: 'Название А - Я'},
  {value: 'name_end', label: 'Название Я - А'},
  {value: 'price_up', label: 'Цена по возростанию'},
  {value: 'price_down', label: 'Цена по убыванию'},
  {value: 'weight_light', label: 'Вес - легче'},
  {value: 'weight_heavy', label: 'Вес - тяжелее'}
]

export const CategorySection: React.FC<ICategorySection> = ({categoryType, filters}) => {
  let spinnerClass = '';
  console.log(filters)
  
  const [productItemsArr, setProductItemsArr] = useState<TProductItemArr[] | undefined>();
  const [filteredItemsArr, setFilteredItemsArr] = useState<TProductItemArr[] | undefined>();
  const [spinner, setSpinner] = useState(true);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  
  const sortSelect = useRef<SelectInstance<ISelectOption | null>>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      let fetchedItems: any = []
      let data: IProductArr[] = await ProductService.getAll()
      if (categoryType) {
        for (let key in data) {
          if (data[key].type.includes(categoryType)) {
            fetchedItems.push(ProductService.productItemToArr(data[key]))
          }
        }
      }
      setProductItemsArr(fetchedItems)
      setSpinner(false);
      sortProductItems(fetchedItems, '')
    }
    fetchProducts()
    
  }, []);
  
  function switchFilter(sortingVal: string) {
    if (filteredItemsArr?.length) {
      sortProductItems(filteredItemsArr, sortingVal)
    }
  }
  
  function sortProductItems(products: TProductItemArr[], action: string) {
    const sortedProducts = [...products];
    setFilteredItemsArr([])
    setSpinner(true);
    
    switch (action) {
      case 'name_end':
        sortedProducts.sort((a, b) => {
          const nameA = a[2].toLowerCase();
          const nameB = b[2].toLowerCase();
          if (nameA < nameB) return 1;
          if (nameA > nameB) return -1;
          return 0;
        });
        break;
      case 'price_up':
        sortedProducts.sort((a, b) => parseFloat(a[3].toString()) - parseFloat(b[3].toString()));
        break;
      case 'price_down':
        sortedProducts.sort((a, b) => parseFloat(b[3].toString()) - parseFloat(a[3].toString()));
        break;
      case 'weight_light':
        sortedProducts.sort((a, b) => parseFloat(a[5].toString()) - parseFloat(b[5].toString()));
        break;
      case 'weight_heavy':
        sortedProducts.sort((a, b) => parseFloat(b[5].toString()) - parseFloat(a[5].toString()));
        break;
      case 'disabledOption':
        sortedProducts.sort((a, b) => {
          const nameA: string = a[2].toLowerCase();
          const nameB: string = b[2].toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        break;
      default:
        //name_start
        sortedProducts.sort((a, b) => {
          const nameA: string = a[2].toLowerCase();
          const nameB: string = b[2].toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        break;
    }
    
    setFilteredItemsArr(sortedProducts);
    setSpinner(false);
  }
  
  function clearFilters(): void {
    if (productItemsArr) {
      filterProductsByDependencies([], productItemsArr);
    }
    
    let inputs = document.querySelectorAll('.filtering_side .filter_checkbox');
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i] as HTMLInputElement
      input.checked = false;
    }
  }
  
  function filterProductsByDependencies(dependenciesList: string[], products: TProductItemArr[]): void {
    const sortedProducts = [...products];
    let filteredProductKeys: string[] = [],
      filteredProducts: TProductItemArr[] = []
    
    if (dependenciesList.length === 0) {
      setFilteredItemsArr(productItemsArr)
      sortSelect.current && sortSelect.current.clearValue();
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
      for (let k = 0; k < filteredProductKeys.length; k++) {
        filteredProducts.push(sortedProducts[Number(filteredProductKeys[k])])
      }
      setFilteredItemsArr(filteredProducts);
      sortSelect.current && sortSelect.current.clearValue();
    }
  }
  
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, checked} = event.target;
    setSelectedCheckboxes(prevState =>
      checked ? [...prevState, value] : prevState.filter(item => item !== value)
    );
  };
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (productItemsArr) {
      filterProductsByDependencies(selectedCheckboxes, productItemsArr);
    }
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
                filters?.map((item, index) => <ProductFilter
                  key={index}
                  filter={item}
                  inputChange={handleCheckboxChange}/>)
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
              <Select
                ref={sortSelect}
                defaultValue={options[0]}
                onChange={(opt) => {
                  if (opt) switchFilter(opt.value)
                }}
                classNamePrefix="react-select"
                placeholder="Сортировка"
                options={options}
              />
              <div className="select_ico">
                <img src="../img/sorting.svg" alt="ico"/>
              </div>
            </div>
          </div>
        </div>
        <div className="product_items">
          {
            spinner ?
              <Preloader customClass={spinnerClass}/>
              : (filteredItemsArr && filteredItemsArr.length > 0) ? filteredItemsArr.map((item, index: number) =>
                <ProductItem itemInfo={item} key={index}/>) : <p>Таких товаров нет!</p>
          }
        </div>
      </div>
    </section>
  )
}