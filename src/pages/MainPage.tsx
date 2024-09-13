import React, {useState, useEffect} from "react";
import {HeadSlider} from "../components/HeadSlider";
import {Populars} from "../components/Populars";
import {ProductItems} from "../components/ProductItems";
import {Categories} from "../components/Categories";
import {Steps} from "../components/Steps";
import {About} from "../components/About";
import {Quote} from "../components/Quote";
import {Cta} from "../components/Cta";
import {ContentService} from "../services/content.service";
import {Preloader} from "../components/Preloader";

//main hero
interface IHeroSlide {
  slideBg: string;
  slideTitle: string;
  slideDescription: string;
  slideProduct: IHeroSlideProduct
}

interface IHeroSlideProduct {
  productTopTitle: string;
  productBottomTitle: string;
  productId: string;
  productImage: string;
  productPrice: string;
}

export interface IMainHero {
  sectionName: string;
  slider: IHeroSlide[]
}

//end of main hero
//populars
interface IPopularsCategory {
  name: string;
  bgImage: string;
  link: string;
}

export interface IPopulars {
  sectionName: string;
  sectionTitle: string;
  popularCategories: IPopularsCategory[]
}

//end of populars
//new items
export interface INewItems {
  sectionName: string;
  sectionTitle: string;
  outputProductsKeys: number[]
}

//end of new items
//categories
interface ICategory {
  name: string;
  bgImage: string;
  link: string;
}

export interface ICategories {
  sectionName: string;
  popularCategories: ICategory[]
}

//end of categories
//info cols
interface IInfoCol {
  title: string;
  description: string;
}

export interface IInfoCols {
  sectionName: string;
  cols: IInfoCol[]
}

//end of info cols
//main page about
export interface IMPAbout {
  sectionName: string;
  sectionBg: string;
  sectionTitle: string;
  sectionText: string[]
}

//end of main page about
//mp quote
export interface IMPQuote {
  sectionName: string;
  sectionQuote: string;
  quoteAuthor: string;
}

//end of mp quote
// cta interface
interface IFormField {
  fieldType: string;
  fieldName: string;
  fieldPlaceholder: string;
}

export interface CtaSection {
  sectionName: string;
  sectionTitle: string;
  sectionSubTitle: string;
  screenForm: {
    formTitle: string;
    formSubTitle: string;
    formFields: IFormField[];
  };
}

// end of cta interface

type MainPageData = [IMainHero, IPopulars, INewItems, ICategories, IInfoCols, IMPAbout, IMPQuote, CtaSection];

export function MainPage() {
  const [sectionsData, setSectionsData] = useState<MainPageData | undefined>();
  const [spinner, setSpinner] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const sectionsData: any = await ContentService.getMainPageSections()
      setSectionsData(sectionsData)
      setSpinner(false);
    }
    fetchData()
  }, []);
  
  let spinnerClass = 'section_min_height';
  if (spinner || !sectionsData) {
    return <Preloader customClass={spinnerClass}/>;
  }
  let [mainSection, populars, newItems, category, infoCols, descriptions, quote, cta] = sectionsData;
  
  return (
    <>
      <HeadSlider sectionInfo={mainSection}/>
      <Populars sectionInfo={populars}/>
      <ProductItems sectionInfo={newItems}/>
      <Categories sectionInfo={category}/>
      <Steps sectionInfo={infoCols}/>
      <About sectionInfo={descriptions}/>
      <Quote sectionInfo={quote}/>
      <Cta sectionInfo={cta}/>
    </>
  )
}