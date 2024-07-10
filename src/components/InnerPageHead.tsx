import React, {useEffect, useState} from "react";
import {Preloader} from "../components/Preloader";
import {Link} from "react-router-dom";

export function InnerPageHead(sectionInfo) {
  const [ sectionData, setSectionData ] = useState({});
  const [ spinner, setSpinner ] = useState(true);
  useEffect(() => {
    setSectionData(sectionInfo.sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  let {sectionName, sectionBg, sectionTitle, breadcrumbs} = sectionData;
  
  return (
    spinner ? <Preloader customClass={spinnerClass} /> : <section data-title={sectionName} className="section-head inner_page_head">
      <div className="section_bg head_overlay lozad" style={{backgroundImage: `url(${sectionBg})`}}>
        <div className="bg_noise"></div>
      </div>
      <div className="screen_content">
        <ul className="breadcrumbs_list negative_top">
          {
            breadcrumbs.map((item, index) => <li key={index}><Link to={item[0]}>{item[1]}</Link></li>)
          }
          <li><span>{sectionTitle}</span></li>
        </ul>
        <div className="head_table">
          <div className="head_cell">
            <div className="main_title size_md">{sectionTitle}</div>
          </div>
        </div>
      </div>
    </section>
  )
}