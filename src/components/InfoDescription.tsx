import React, {useEffect, useState} from "react";
import {Preloader} from "./Preloader";

interface IInfoDescrIn {
  sectionName: string,
  sectionTitle: string,
  textLines: string[],
  image: string
}

interface IInfoDescr {
  sectionInfo: IInfoDescrIn
}

export const InfoDescription: React.FC<IInfoDescr> = ({sectionInfo}) => {
  const [sectionData, setSectionData] = useState<IInfoDescrIn>({
    sectionName: '',
    sectionTitle: '',
    textLines: [],
    image: ''
  });
  const [spinner, setSpinner] = useState(true);
  
  useEffect(() => {
    setSectionData(sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  let {sectionName, image, sectionTitle, textLines} = sectionData;
  
  return (
    spinner ? <Preloader customClass={spinnerClass}/> : <section data-title={sectionName} className="section-delivery">
      <div className="section_bg">
        <div className="screen_content">
          <div className="circulap_decor to_right">
            <img className="circulap_decor_img" src="img/circulap_decor_img.svg" alt="ico"/>
          </div>
        </div>
      </div>
      <div className="bg_noise"></div>
      <div className="screen_content">
        <div className="delivery_sides half_sides reversed">
          <div className="delivery_side content_side">
            <div className="main_title_wrapper">
              <div className="main_title">{sectionTitle}</div>
            </div>
            <div className="simple_text">
              {
                textLines.map((line: string, index: number) => <p key={index}>{line}</p>)
              }
            </div>
          </div>
          <div className="delivery_side image_side"><img src={image} alt="img"/></div>
        </div>
      </div>
    </section>
  )
}