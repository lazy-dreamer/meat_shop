import React, {useEffect, useState} from "react";
import {InnerPageHead} from "../components/InnerPageHead";
import {useParams} from "react-router-dom";
import {ProductService} from "../services/product.service";
import {Preloader} from "../components/Preloader";
import {CategorySection, ICategoryFilter} from "../components/CategorySection";
import {IInnerPageHead} from "./AboutPage";

export function Category() {
  const {id} = useParams();
  const [headSectionData, setHeadSectionData] = useState<IInnerPageHead>({
    "sectionName": "Шапка",
    "sectionBg": "",
    "sectionTitle": "",
    "breadcrumbs": [
      ["/", "Главная"],
      ["/catalog", "Каталог продукции"]
    ]
  });
  
  const [spinner, setSpinner] = useState(true);
  const [categoryFilters, setCategoryFilters] = useState<ICategoryFilter[] | undefined>();
  let spinnerClass = 'section_min_height';
  
  useEffect(() => {
    const fetchData = async () => {
      const categories: any = await ProductService.getAllCategories()
      for (let i = 0; i < categories.length; i++) {
        if (categories.hasOwnProperty(i)) {
          if (categories[i].link === id) {
            setCategoryFilters(categories[i].filterSets)
            setHeadSectionData(prev => ({
              ...prev,
              "sectionBg": `../${categories[i].categoryHeadImage}`,
              "sectionTitle": categories[i].name
            }))
            break
          }
        }
      }
      setSpinner(false);
    }
    fetchData()
  }, []);
  
  return (
    spinner ? <Preloader customClass={spinnerClass}/> : <>
      <InnerPageHead sectionInfo={headSectionData}/>
      <CategorySection categoryType={id} filters={categoryFilters}/>
    </>
  )
}