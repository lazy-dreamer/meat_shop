import React, {useEffect, useState} from "react";
import {MainPageCta} from "../components/mainPageSections/MainPageCta";
import {ContactsSection} from "../components/contactsSections/ContactsSection";
import {ContentService} from "../services/content.service";
import {Preloader} from "../components/Preloader";

export function Contacts() {
  const [sectionsData, setSectionsData] = useState([]);
  const [ spinner, setSpinner ] = useState(true);
  let [contacts, cta] = sectionsData;
  let spinnerClass = 'section_min_height';

  useEffect(() => {
    const fetchData = async () => {
      const sectionsData = await ContentService.getContactsSections()
      setSectionsData(sectionsData)
      setSpinner(false);
    }
    fetchData()
  }, []);

  // console.log(content)
  return (
    spinner ? <Preloader customClass={spinnerClass} /> : <>
      <ContactsSection sectionInfo={contacts} />
      <MainPageCta sectionInfo={cta} />
    </>
  )
}