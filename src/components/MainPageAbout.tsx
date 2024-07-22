import React, {useEffect, useState} from "react";
import {Preloader} from "./Preloader";
import {Link, useLocation} from "react-router-dom";
import {IMPAbout} from "../pages/MainPage";

interface IMainPageAbout {
  sectionInfo: IMPAbout
}

export const MainPageAbout: React.FC<IMainPageAbout> = ({sectionInfo}) => {
  const location = useLocation();
  
  const [sectionData, setSectionData] = useState<IMPAbout | undefined>();
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setSectionData(sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  if (spinner || !sectionData) {
    return <Preloader customClass={spinnerClass}/>;
  }
  let {sectionName, sectionBg, sectionTitle, sectionText} = sectionData;
  
  
  return (
    <section className="section-about" data-title={sectionName}>
      <div className="section_bg about_bg_overlay lozad" style={{backgroundImage: `url(${sectionBg})`}}/>
      <div className="bg_noise"/>
      <div className="screen_content">
        <div className="about_table">
          <div className="about_cell">
            <div className="about_sides">
              <div className="about_side left">
                <div className="main_title size_lg">{sectionTitle}</div>
              </div>
              <div className="about_side right">
                <div className="simple_text">
                  {sectionText?.map((textLine: string, index: number) =>
                    <p key={index}>{textLine}</p>
                  )}
                </div>
                {
                  location.pathname.replace('/', '') !== 'about' ? <Link to="/about" className="more_btn">
                    <span className="more_btn_text with_line">УЗНАТЬ БОЛЬШЕ</span><span
                    className="more_btn_ico"><img src="img/chevron_right2.svg" alt="ico"/></span>
                  </Link> : ''
                }
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}