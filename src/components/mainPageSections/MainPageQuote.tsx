import React, {useEffect, useState} from "react";
import {Preloader} from "../Preloader";

export function MainPageQuote(sectionInfo) {
  const [ sectionData, setSectionData ] = useState('');
  const [ spinner, setSpinner ] = useState(true);
  useEffect(() => {
    setSectionData(sectionInfo.sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  let {sectionName, sectionQuote, quoteAuthor} = sectionData;

  return (
    spinner ? <Preloader customClass={spinnerClass} /> : <section className="section-quote lighter_bg" data-title={sectionName}>
      <div className="bg_noise"></div>
      <div className="screen_content">
        <div className="main_title_wrapper centered">
          <div className="quote_ico"><img src="img/quote_ico.svg" alt="ico"/></div>
          <div className="main_title">{sectionQuote}</div>
          <p><i>{quoteAuthor}</i></p>
        </div>
      </div>
    </section>
  )
}