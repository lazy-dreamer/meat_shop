import React, {useEffect, useState} from "react";
import {Preloader} from "./Preloader";
import {ProductItem} from "./ProductItem";
import {Link} from "react-router-dom";
import {IProductArr, ProductService} from "../services/product.service";
import {INewItems} from "../pages/MainPage";

interface IMainPageProductItems {
  sectionInfo: INewItems
}

export type TProductItemArr = [number, string, string, number, string, number, string, string[]]

export const ProductItems: React.FC<IMainPageProductItems> = ({sectionInfo}) => {
  const [sectionData, setSectionData] = useState<INewItems | undefined>();
  const [spinner, setSpinner] = useState(true);
  const [products, setProducts] = useState<IProductArr[] | undefined>();
  const [popularItemsArr, setPopularItemsArr] = useState<TProductItemArr[] | undefined>();
  
  useEffect(() => {
    setSectionData(sectionInfo)
    const fetchProducts = async () => {
      let data: IProductArr[] = await ProductService.getAll()
      setProducts(data)
    }
    
    fetchProducts()
  }, []);
  
  useEffect(() => {
    if (products) {
      let tempPopularItems: any = sectionInfo.outputProductsKeys.map((item) => ProductService.productItemToArr(products[item]))
      setPopularItemsArr(tempPopularItems);
      setSpinner(false);
    }
  }, [products]);
  
  let spinnerClass = 'section_min_height';
  if (spinner || !sectionData) {
    return <Preloader customClass={spinnerClass}/>
  }
  
  let {sectionName, sectionTitle} = sectionData;
  return (
    <section className="section-product-items" data-title={sectionName}>
      <div className="top_lighter_line lighter_bg"/>
      <div className="bg_noise"/>
      <div className="section_bg">
        <div className="screen_content">
          <div className="circulap_decor to_right">
            <img className="circulap_decor_img" src="img/circulap_decor_img.svg" alt="ico"/>
          </div>
        </div>
      </div>
      <div className="screen_content">
        <div className="main_title_wrapper centered">
          <div className="main_title">{sectionTitle}</div>
        </div>
        <div className="product_items">
          {
            popularItemsArr?.map((item, index) => <ProductItem itemInfo={item} key={index}/>)
          }
        </div>
        <div className="main_btn_wrapper centered">
          <Link to="/catalog" className="main_btn bordered">
            <span className="main_btn_inner">КАТАЛОГ ТОВАРОВ</span>
          </Link>
        </div>
      </div>
    </section>
  )
}