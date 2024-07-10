import React, {useEffect, useState} from "react";
import {Preloader} from "../Preloader";

export function MainPageSteps(sectionInfo) {
  const [ sectionData, setSectionData ] = useState('');
  const [ spinner, setSpinner ] = useState(true);
  useEffect(() => {
    setSectionData(sectionInfo.sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  let {sectionName, cols} = sectionData;
  
  return (
    spinner ? <Preloader customClass={spinnerClass} /> :
      <section className="section-steps" data-title={sectionName}>
        <div className="bg_noise"></div>
        <div className="screen_content">
          <div className="step_cols">
            {cols.map((col, index) => <div className="step_col" key={index}>
              <div className="step_col_block">
                <div className="step_col_title">{col.title}</div>
                <p>{col.description}</p>
              </div>
            </div>)}
            
          </div>
        </div>
      </section>
  )
}