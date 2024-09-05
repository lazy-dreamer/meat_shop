import React, {useEffect, useState} from "react";
import {Preloader} from "./Preloader";
import {Link} from "react-router-dom";
import {ProductService} from "../services/product.service";

interface IFilterSet {
  filterName: string;
  filterVariants: string[][];
}

interface ICategory {
  name: string;
  bgImage: string;
  categoryHeadImage: string;
  link: string;
  filterSets: IFilterSet[];
}


export const Catalog: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [spinner, setSpinner] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await ProductService.getAllCategories()
      setCategories(data)
      setSpinner(false)
    }
    fetchData()
  }, []);
  
  let spinnerClass = 'section_min_height';
  
  return (
    spinner ? <Preloader customClass={spinnerClass}/> : <section className="section-product-items">
      <div className="bg_noise"/>
      <div className="section_bg">
        <div className="screen_content">
          <div className="circulap_decor to_right">
            <img className="circulap_decor_img" src="img/circulap_decor_img.svg" alt="ico"/>
          </div>
        </div>
      </div>
      <div className="screen_content">
        <div className="product_items">
          {
            categories && categories.map((item, index) => <Link key={index} to={`/category/${item.link}`}
                                                                className="product_item">
              <div className="product_item_img_frame smaller">
                <div className="product_item_img lozad" style={{backgroundImage: `url(${item.bgImage})`}}/>
              </div>
              <div className="product_item_body">
                <div className="product_item_title">{item.name}</div>
              </div>
            </Link>)
          }
        </div>
      </div>
    </section>
  )
}