import React, {useEffect, useState} from "react";
import {Preloader} from "./Preloader";
import {IInfoCols} from "../pages/MainPage";

interface IMainPageCols {
  sectionInfo: IInfoCols
}

export const MainPageSteps: React.FC<IMainPageCols> = ({sectionInfo}) => {
  const [sectionData, setSectionData] = useState<IInfoCols | undefined>();
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setSectionData(sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  if (spinner || !sectionData) {
    return <Preloader customClass={spinnerClass}/>
  }
  let {sectionName, cols} = sectionData;
  
  return (
    <section className="section-steps" data-title={sectionName}>
      <div className="bg_noise"/>
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