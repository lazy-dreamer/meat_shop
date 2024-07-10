import React, {useState, useEffect} from "react";
import {MainPageHeadSlider} from "../components/mainPageSections/MainPageHeadSlider";
import {MainPagePopulars} from "../components/mainPageSections/MainPagePopulars";
import {MainPageProductItems} from "../components/mainPageSections/MainPageProductItems";
import {MainPageCategories} from "../components/mainPageSections/MainPageCategories";
import {MainPageSteps} from "../components/mainPageSections/MainPageSteps";
import {MainPageAbout} from "../components/mainPageSections/MainPageAbout";
import {MainPageQuote} from "../components/mainPageSections/MainPageQuote";
import {MainPageCta} from "../components/mainPageSections/MainPageCta";
import {ContentService} from "../services/content.service";
import {Preloader} from "../components/Preloader";


export function MainPage(content) {
  const [sectionsData, setSectionsData] = useState([]);
  const [ spinner, setSpinner ] = useState(true);
  let [mainSection, populars, newItems, category, infoCols, descriptions, quote, cta] = sectionsData;
  let spinnerClass = 'section_min_height';
  
  useEffect(() => {
    const fetchData = async () => {
      const sectionsData = await ContentService.getMainPageSections()
      setSectionsData(sectionsData)
      setSpinner(false);
    }
    fetchData()
  }, []);
  
  return (
    spinner ? <Preloader customClass={spinnerClass} /> : <>
      <MainPageHeadSlider sectionInfo={mainSection} />
      <MainPagePopulars sectionInfo={populars} />
      <MainPageProductItems sectionInfo={newItems} />
      <MainPageCategories sectionInfo={category} />
      <MainPageSteps sectionInfo={infoCols} />
      <MainPageAbout sectionInfo={descriptions} />
      <MainPageQuote sectionInfo={quote} />
      <MainPageCta sectionInfo={cta} />
    </>
  )
}