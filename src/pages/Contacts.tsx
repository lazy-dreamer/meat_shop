import React, {useEffect, useState} from "react";
import {MainPageCta} from "../components/MainPageCta";
import {ContactsSection} from "../components/ContactsSection";
import {ContentService} from "../services/content.service";
import {Preloader} from "../components/Preloader";
import {CtaSection} from "./MainPage";

interface ILink {
  name: string;
  url: string;
}

interface IMap {
  center: [string, string];
  pin: string;
}

export interface IContactSection {
  sectionName: string;
  sectionTitle: string;
  sectionSubTitle: string;
  textLines: string[];
  links: ILink[];
  map: IMap;
}

type SectionData = [IContactSection, CtaSection];

export function Contacts() {
  const [sectionsData, setSectionsData] = useState<SectionData | null>();
  const [spinner, setSpinner] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const sectionsData: any = await ContentService.getContactsSections()
      setSectionsData(sectionsData)
      setSpinner(false);
    }
    fetchData()
  }, []);
  
  let spinnerClass = 'section_min_height';
  if (spinner || !sectionsData) {
    return <Preloader customClass={spinnerClass}/>
  }
  let [contacts, cta] = sectionsData;
  
  return (
    <>
      <ContactsSection sectionInfo={contacts}/>
      <MainPageCta sectionInfo={cta}/>
    </>
  )
}