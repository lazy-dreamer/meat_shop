import React, {useEffect, useState} from "react";
import {InnerPageHead} from "../components/InnerPageHead";
import {MainPageSteps} from "../components/mainPageSections/MainPageSteps";
import {MainPageAbout} from "../components/mainPageSections/MainPageAbout";
import {MainPageQuote} from "../components/mainPageSections/MainPageQuote";
import {InfoDescription} from "../components/aboutPageSections/InfoDescription"
import {Sertificats} from "../components/aboutPageSections/Sertificats"
import {ContentService} from "../services/content.service";
import {Preloader} from "../components/Preloader";

export function AboutPage() {
  const [ sectionData, setSectionData ] = useState('');
  const [ spinner, setSpinner ] = useState(true);
  let spinnerClass = 'section_min_height';
  useEffect(() => {
    const fetchData = async () => {
      const sectionsData = await ContentService.getAboutPageSections()

      setSectionData(sectionsData)
      setSpinner(false);
    }
    fetchData()
  }, []);
  let [headSection, infoDescriptions, infoCols, descriptions, quote, sertificats] = sectionData;
  // console.log(content)
  return (
    spinner ? <Preloader customClass={spinnerClass} /> : <>
      <InnerPageHead sectionInfo={headSection} />
      <InfoDescription sectionInfo={infoDescriptions} />
      <MainPageSteps sectionInfo={infoCols} />
      <MainPageAbout sectionInfo={descriptions} />
      <MainPageQuote sectionInfo={quote} />
      <Sertificats sectionInfo={sertificats} />
    </>
  )
}