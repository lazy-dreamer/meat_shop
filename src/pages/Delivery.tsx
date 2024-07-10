import React, {useEffect, useState} from "react";
import {InnerPageHead} from "../components/InnerPageHead";
import {MainPageSteps} from "../components/mainPageSections/MainPageSteps";
import {DeliveryScreen} from "../components/deliveryPageSections/DeliveryScreen";
import {PaymentScreen} from "../components/deliveryPageSections/PaymentScreen";
import {ContentService} from "../services/content.service";
import {Preloader} from "../components/Preloader";

export function Delivery() {
  const [sectionsData, setSectionsData] = useState([]);
  const [ spinner, setSpinner ] = useState(true);
  let [headSection, delivery, infoCols, payments] = sectionsData;
  useEffect(() => {
    const fetchData = async () => {
      const sectionsData = await ContentService.getDeliverySections()
      setSectionsData(sectionsData)
      setSpinner(false);
    }
    fetchData()
  }, []);
  let spinnerClass = 'section_min_height';
  // console.log(content)
  return (
    spinner ? <Preloader customClass={spinnerClass} /> : <>
      <InnerPageHead sectionInfo={headSection} />
      <DeliveryScreen sectionInfo={delivery} />
      <MainPageSteps sectionInfo={infoCols} />
      <PaymentScreen sectionInfo={payments} />
    </>
  )
}