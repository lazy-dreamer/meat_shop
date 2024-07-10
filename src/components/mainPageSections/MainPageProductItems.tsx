import React, {useContext, useEffect, useState} from "react";
import {Preloader} from "../Preloader";
import {ProductItem} from "../ProductItem";
import {Link} from "react-router-dom";
import {ProductService} from "../../services/product.service";
import {CartContext} from "../../providers/CartProvider";

export function MainPageProductItems({sectionInfo}) {
  const [ sectionData, setSectionData ] = useState('');
  const [ spinner, setSpinner ] = useState(true);
  const [popularItemsArr, setPopularItemsArr] = useState([])
  const { products } = useContext(CartContext);
  let spinnerClass = 'section_min_height',
    {sectionName, sectionTitle} = sectionData;
  useEffect(() => {
    setSectionData(sectionInfo)
    let tempPopularItems = sectionInfo.outputProductsKeys.map((item)=>ProductService.productItemToArr(products[item]))
    setPopularItemsArr(tempPopularItems);
    setSpinner(false);
  }, []);
  
  return (
    spinner ? <Preloader customClass={spinnerClass} /> :
      <section className="section-product-items" data-title={sectionName}>
        <div className="top_lighter_line lighter_bg"></div>
        <div className="bg_noise"></div>
        <div className="section_bg">
          <div className="screen_content">
            <div className="circulap_decor to_right"><img className="circulap_decor_img" src="img/circulap_decor_img.svg" alt="ico"/></div>
          </div>
        </div>
        <div className="screen_content">
          <div className="main_title_wrapper centered">
            <div className="main_title">{sectionTitle}</div>
          </div>
          <div className="product_items">
            {
              popularItemsArr.map((item, index) => <ProductItem itemInfo={item} key={index} />)
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