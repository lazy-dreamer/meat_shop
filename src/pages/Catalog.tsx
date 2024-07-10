import React, {useEffect, useState} from "react";
import {CatalogPageCatalog} from '../components/catalogPageSections/CatalogPageCatalog'
import {MainPageSteps} from "../components/mainPageSections/MainPageSteps";
import {InnerPageHead} from "../components/InnerPageHead"
import {MainPageCta} from "../components/mainPageSections/MainPageCta";
import {ContentService} from "../services/content.service";
import {Preloader} from "../components/Preloader";

export function Catalog() {
  const [sectionsData, setSectionsData] = useState([]);
  const [ spinner, setSpinner ] = useState(true);
  let [headSection, categories, infoCols, cta] = sectionsData;
  let spinnerClass = 'section_min_height';
  useEffect(() => {
    const fetchData = async () => {
      const sectionsData = await ContentService.getCatalogSections()
      setSectionsData(sectionsData)
      setSpinner(false);
    }
    fetchData()
  }, []);
  return (
    spinner ? <Preloader customClass={spinnerClass} /> : <>
      <InnerPageHead sectionInfo={headSection} />
      <CatalogPageCatalog sectionInfo={categories} />
      <MainPageSteps sectionInfo={infoCols} />
      <MainPageCta sectionInfo={cta} />
    </>
  )
}