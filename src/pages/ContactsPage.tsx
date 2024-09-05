import React, {useEffect, useState} from "react";
import {Cta} from "../components/Cta";
import {Contacts} from "../components/Contacts";
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

export function ContactsPage() {
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
      <Contacts sectionInfo={contacts}/>
      <Cta sectionInfo={cta}/>
    </>
  )
}
