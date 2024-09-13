import React, {useEffect, useState} from "react";
import {InnerPageHead} from "../components/InnerPageHead";
import {Steps} from "../components/Steps";
import {About} from "../components/About";
import {Quote} from "../components/Quote";
import {InfoDescription} from "../components/InfoDescription"
import {Sertificats} from "../components/Sertificats"
import {ContentService} from "../services/content.service";
import {Preloader} from "../components/Preloader";
import {IInfoCols, IMPAbout, IMPQuote} from "./MainPage";

export interface IInnerPageHead {
  sectionName: string;
  sectionBg: string;
  sectionTitle: string;
  breadcrumbs: [string, string][]
}

interface IInfoDescription {
  sectionName: string;
  sectionTitle: string;
  textLines: string[];
  image: string;
}

interface ISertificates {
  sectionName: string;
  sectionTitle: string;
  sertBlocks: [string, string][];
}

type TAboutPage = [IInnerPageHead, IInfoDescription, IInfoCols, IMPAbout, IMPQuote, ISertificates]

export const AboutPage: React.FC = () => {
  const [sectionsData, setSectionsData] = useState<TAboutPage | null>();
  const [spinner, setSpinner] = useState(true);
  let spinnerClass = 'section_min_height';
  useEffect(() => {
    const fetchData = async () => {
      const sectionsData: any = await ContentService.getAboutPageSections()
      setSectionsData(sectionsData);
      setSpinner(false);
    }
    fetchData()
  }, []);
  if (spinner || !sectionsData) {
    return <Preloader customClass={spinnerClass}/>
  }
  let [headSection, infoDescriptions, infoCols, descriptions, quote, sertificats] = sectionsData;
  
  return (
    <>
      <InnerPageHead sectionInfo={headSection}/>
      <InfoDescription sectionInfo={infoDescriptions}/>
      <Steps sectionInfo={infoCols}/>
      <About sectionInfo={descriptions}/>
      <Quote sectionInfo={quote}/>
      <Sertificats sectionInfo={sertificats}/>
    </>
  )
}