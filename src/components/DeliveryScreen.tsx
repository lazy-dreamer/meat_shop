import React, {useEffect, useState} from "react";
import {Preloader} from "./Preloader";

interface IDeliveryText {
  lineStrong: string;
  lineText: string;
}

export interface IDeliveryData {
  sectionName: string;
  sectionTitle: string;
  textLines: IDeliveryText[];
  frameText: string;
  image: string;
}

export interface IDeliveryScreen {
  sectionInfo: IDeliveryData
}

export const DeliveryScreen: React.FC<IDeliveryScreen> = ({sectionInfo}) => {
  const [sectionData, setSectionData] = useState<IDeliveryData | undefined>();
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setSectionData(sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  
  if (spinner || !sectionData) {
    return <Preloader customClass={spinnerClass}/>;
  }
  
  let {sectionName, sectionTitle, image, textLines} = sectionData;
  
  return (
    <section className="section-delivery" data-title={sectionName}>
      <div className="section_bg">
        <div className="screen_content">
          <div className="circulap_decor to_right">
            <img className="circulap_decor_img" src="img/circulap_decor_img.svg" alt="ico"/>
          </div>
        </div>
      </div>
      <div className="bg_noise"/>
      <div className="screen_content">
        <div className="delivery_sides half_sides reversed">
          <div className="delivery_side content_side">
            <div className="main_title_wrapper">
              <div className="main_title">{sectionTitle}</div>
            </div>
            <div className="simple_text">
              {
                textLines.map((line: IDeliveryText, index: number) => <p key={index}>
                  <strong>{line.lineStrong}</strong> {line.lineText}</p>)
              }
            </div>
          </div>
          <div className="delivery_side image_side"><img src={image} alt="img"/></div>
        </div>
      </div>
    </section>
  )
}