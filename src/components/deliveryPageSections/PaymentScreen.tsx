import React, {useEffect, useState} from "react";
import {Preloader} from "../Preloader";

export function PaymentScreen(sectionInfo) {
  const [ sectionData, setSectionData ] = useState('');
  const [ spinner, setSpinner ] = useState(true);
  useEffect(() => {
    setSectionData(sectionInfo.sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  let {sectionName, image, sectionTitle, textLines, frameText} = sectionData;
  // console.log(sectionData)
  return (
    spinner ? <Preloader customClass={spinnerClass} /> : <section className="section-delivery" data-title={sectionName} >
      <div className="bg_noise"></div>
      <div className="screen_content">
        <div className="delivery_sides half_sides">
          <div className="delivery_side content_side">
            <div className="main_title_wrapper small_offset">
              <div className="main_title">{sectionTitle}</div>
            </div>
            <div className="simple_text bottom_offset">
              {
                textLines.map((line, index) => <p key={index}><strong>{line.lineStrong}</strong> {line.lineText}</p>)
              }
            </div>
            <div className="delivery_msg aside_side_frame">
              <p>{frameText}</p>
            </div>
          </div>
          <div className="delivery_side image_side"><img src={image} alt="img"/></div>
        </div>
      </div>
    </section>
  )
}