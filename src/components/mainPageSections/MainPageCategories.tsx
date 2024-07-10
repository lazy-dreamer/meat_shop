import React, {useEffect, useState} from "react";
import {Preloader} from "../Preloader";
import {Link} from "react-router-dom";

export function MainPageCategories(sectionInfo) {
  const [ sectionData, setSectionData ] = useState('');
  const [ spinner, setSpinner ] = useState(true);
  useEffect(() => {
    setSectionData(sectionInfo.sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  let {sectionName, popularCategories} = sectionData;
  
  return (
    spinner ? <Preloader customClass={spinnerClass} /> : <section className="section-categories lighter_bg" data-title={sectionName}>
      <div className="bg_noise"></div>
      <div className="screen_content">
        <div className="circulap_decor to_right top_layer"><img className="circulap_decor_img" src="img/circulap_decor_img.svg" alt="ico"/></div>
        <div className="category_sides_blocks">
          
          {
            popularCategories.map((cat, index) => <Link key={index} className="category_block product_item" to={`category/${cat.link}`}>
              <div className="product_item_img_frame">
                <div className="product_item_img lozad" style={{backgroundImage: `url(${cat.bgImage})`}}></div>
                <div className="product_item_title">{cat.name}</div>
              </div>
            </Link>)
          }
        </div>
      </div>
    </section>
  )
}