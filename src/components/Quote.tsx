import React, {useEffect, useState} from "react";
import {Preloader} from "./Preloader";
import {IMPQuote} from "../pages/MainPage";

interface IMainPageQuote {
  sectionInfo: IMPQuote
}

export const Quote: React.FC<IMainPageQuote> = ({sectionInfo}) => {
  const [sectionData, setSectionData] = useState<IMPQuote | undefined>();
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setSectionData(sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  if (spinner || !sectionData) {
    return <Preloader customClass={spinnerClass}/>
  }
  let {sectionName, sectionQuote, quoteAuthor} = sectionData;
  
  return (
    <section className="section-quote lighter_bg" data-title={sectionName}>
      <div className="bg_noise"/>
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