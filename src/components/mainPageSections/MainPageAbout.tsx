import React, {useEffect, useState} from "react";
import {Preloader} from "../Preloader";
import {Link} from "react-router-dom";

export function MainPageAbout(sectionInfo) {
  const [ sectionData, setSectionData ] = useState('');
  const [ spinner, setSpinner ] = useState(true);
  useEffect(() => {
    setSectionData(sectionInfo.sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  let {sectionName, sectionBg, sectionTitle, sectionText} = sectionData;
  
  return (
    spinner ? <Preloader customClass={spinnerClass} /> :
      <section className="section-about" data-title={sectionName}>
        <div className="section_bg about_bg_overlay lozad" style={{backgroundImage: `url(${sectionBg})`}}></div>
        <div className="bg_noise"></div>
        <div className="screen_content">
          <div className="about_table">
            <div className="about_cell">
              <div className="about_sides">
                <div className="about_side left">
                  <div className="main_title size_lg">{sectionTitle}</div>
                </div>
                <div className="about_side right">
                  <div className="simple_text">
                    {sectionText?.map((textLine, index) =>
                      <p key={index}>{textLine}</p>
                    )}
                  </div>
                  <Link to="/about" className="more_btn">
                    <span className="more_btn_text with_line">УЗНАТЬ БОЛЬШЕ</span><span
                    className="more_btn_ico"><img src="img/chevron_right2.svg" alt="ico"/></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}