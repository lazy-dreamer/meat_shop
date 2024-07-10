import React, {useEffect, useState} from "react";
import {InnerPageHead} from "../components/InnerPageHead";
import {useParams} from "react-router-dom";
import {ProductService} from "../services/product.service";
import {Preloader} from "../components/Preloader";
import {CategorySection} from "../components/categoryPageSections/CategorySection";

export function Category() {
  const {id} = useParams();
  const [headSectionData, setHeadSectionData] = useState({
    "sectionName": "Шапка",
    "sectionBg": "",
    "sectionTitle": "",
    "breadcrumbs": [
      ["/", "Главная"],
      ["/catalog", "Каталог продукции"]
    ]
  });
  const [ spinner, setSpinner ] = useState(true);
  const [ categoryFilters, setCategoryFilters ] = useState([]);
  let spinnerClass = 'section_min_height';

  useEffect(() => {
    const fetchData = async () => {
      const categories = await ProductService.getAllCategories()
      for (var key in categories) {
        if (categories.hasOwnProperty(key)) {
          if (categories[key].link===id) {
            setCategoryFilters(categories[key].filterSets)
            setHeadSectionData(prev => ({...prev, 
              "sectionBg": `../${categories[key].categoryHeadImage}`,
              "sectionTitle":categories[key].name
            }))
            break
          }
        }
      }
      setSpinner(false);
      
    }
    fetchData()
  }, []);

  // console.log(headSectionData)
  
  // console.log(categories)
  // console.log(id)
  return (
    spinner ? <Preloader customClass={spinnerClass} /> : <>
      <InnerPageHead sectionInfo={headSectionData} />
      <CategorySection categoryType={id} filters={categoryFilters} />
    </>
  )
}