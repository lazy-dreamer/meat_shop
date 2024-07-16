import React, {useEffect, useState} from "react";
import {InnerPageHead} from "../components/InnerPageHead";
import {MainPageSteps} from "../components/MainPageSteps";
import {DeliveryScreen} from "../components/DeliveryScreen";
import {PaymentScreen} from "../components/PaymentScreen";
import {ContentService} from "../services/content.service";
import {Preloader} from "../components/Preloader";

export function Delivery() {
  const [sectionsData, setSectionsData] = useState([]);
  const [spinner, setSpinner] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const sectionsData = await ContentService.getDeliverySections()
      setSectionsData(sectionsData)
      setSpinner(false);
    }
    fetchData()
  }, []);
  let spinnerClass = 'section_min_height';
  if (spinner || !sectionsData) {
    return <Preloader customClass={spinnerClass}/>
  }
  let [headSection, delivery, infoCols, payments] = sectionsData;
  
  return (
    <>
      <InnerPageHead sectionInfo={headSection}/>
      <DeliveryScreen sectionInfo={delivery}/>
      <MainPageSteps sectionInfo={infoCols}/>
      <PaymentScreen sectionInfo={payments}/>
    </>
  )
}