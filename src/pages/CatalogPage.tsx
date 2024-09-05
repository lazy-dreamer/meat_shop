import React, {useEffect, useState} from "react";
import {Catalog} from '../components/Catalog'
import {Steps} from "../components/Steps";
import {InnerPageHead} from "../components/InnerPageHead"
import {Cta} from "../components/Cta";
import {ContentService} from "../services/content.service";
import {Preloader} from "../components/Preloader";
import {IInnerPageHead} from "./AboutPage";
import {CtaSection, IInfoCols} from "./MainPage";

interface ICAtegorie {
  name: string;
  bgImage: string;
  link: string;
}

interface ICAtegories {
  sectionName: string;
  categories: ICAtegorie[]
}

type TCatalogPage = [IInnerPageHead, ICAtegories, IInfoCols, CtaSection]

export function CatalogPage() {
  const [sectionsData, setSectionsData] = useState<TCatalogPage | undefined>();
  const [spinner, setSpinner] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const sectionsData: any = await ContentService.getCatalogSections()
      setSectionsData(sectionsData)
      
      setSpinner(false);
    }
    fetchData()
  }, []);
  
  let spinnerClass = 'section_min_height';
  if (spinner || !sectionsData) {
    return <Preloader customClass={spinnerClass}/>
  }
  let [headSection, _, infoCols, cta] = sectionsData;
  
  return (
    <>
      <InnerPageHead sectionInfo={headSection}/>
      <Catalog/>
      <Steps sectionInfo={infoCols}/>
      <Cta sectionInfo={cta}/>
    </>
  )
}