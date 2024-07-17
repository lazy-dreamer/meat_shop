import React, {useEffect, useState} from "react";
import {InnerPageHead} from "../components/InnerPageHead";
import {MainPageSteps} from "../components/MainPageSteps";
import {DeliveryScreen} from "../components/DeliveryScreen";
import {PaymentScreen} from "../components/PaymentScreen";
import {ContentService} from "../services/content.service";
import {Preloader} from "../components/Preloader";
import {IInnerPageHead} from "./AboutPage";
import {IInfoCols} from "./MainPage";

interface IDeliveryText {
  lineStrong: string;
  lineText: string;
}

interface IDeliveryScreen {
  sectionName: string;
  sectionTitle: string;
  textLines: IDeliveryText[];
  frameText: string;
  image: string;
}

interface IPaymentSection {
  sectionName: string;
  sectionTitle: string;
  textLines: IDeliveryText[];
  frameText: string;
  image: string;
}

type TDeliveryPage = [IInnerPageHead, IDeliveryScreen, IInfoCols, IPaymentSection]

export function Delivery() {
  const [sectionsData, setSectionsData] = useState<TDeliveryPage | undefined>();
  const [spinner, setSpinner] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const sectionsData: any = await ContentService.getDeliverySections()
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