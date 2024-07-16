import React, {useEffect, useState} from "react";
import {Preloader} from "../components/Preloader";
import {Link} from "react-router-dom";

interface IInnerPageHeadData {
  sectionName: string;
  sectionBg: string;
  sectionTitle: string;
  breadcrumbs: [string, string][]
}

interface IInnerPageHead {
  sectionInfo: IInnerPageHeadData
}

export const InnerPageHead: React.FC<IInnerPageHead> = ({sectionInfo}) => {
  const [sectionData, setSectionData] = useState<IInnerPageHeadData | undefined>();
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setSectionData(sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  
  if (spinner || !sectionData) {
    return <Preloader customClass={spinnerClass}/>;
  }
  
  let {sectionName, sectionBg, sectionTitle, breadcrumbs} = sectionData;
  
  return (
    <section data-title={sectionName} className="section-head inner_page_head">
      <div className="section_bg head_overlay lozad" style={{backgroundImage: `url(${sectionBg})`}}>
        <div className="bg_noise"/>
      </div>
      <div className="screen_content">
        <ul className="breadcrumbs_list negative_top">
          {
            breadcrumbs.map((item: [string, string], index: number) => <li key={index}><Link
              to={item[0]}>{item[1]}</Link></li>)
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