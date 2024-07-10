import React, {useEffect, useState} from "react";
import {Preloader} from "./Preloader";
import {Link} from "react-router-dom";
import {ContentService} from "../services/content.service";
import logo from "../img/main_logo.svg"

export function Footer(content) {
  const [ sectionData, setSectionData ] = useState('');
  const [ spinner, setSpinner ] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await ContentService.getFooter()
      setSectionData(data)
      setSpinner(false)
    }
    fetchData()
  }, []);
  let spinnerClass = 'footer_preloader';
  let {footerBottomLine, footerTopLine} = sectionData;
  
  // console.log(sectionData)
  return (
    spinner ? <Preloader customClass={spinnerClass} /> : <footer className="footer lighter_bg">
      <div className="bg_noise"></div>
      <div className="screen_content">
        <div className="footer_line top_line">
          <div className="footer_content">
            <div className="footer_content_left">
              <div className="main_logo">
                <Link to="/">
                  <img src={logo} alt="logo"/>
                </Link>
              </div>
              <p>{footerTopLine.logoDescription}</p>
            </div>
            <div className="footer_content_right">
              {
                footerTopLine.footerCols.map((col, index) => 
                  <div className="footer_content_col" key={index}>
                    <div className="footer_col_title">{col.title}</div>
                    <ul className="footer_list">
                      {
                        col.links.map((link, index) => 
                          <li key={index}><Link to={link[0]}>{link[1]}</Link></li>)
                      }
                    </ul>
                  </div>)
              }
            </div>
          </div>
        </div>
        <div className="footer_line bottom_line">
          <div className="copyright">{footerBottomLine.copyright}</div>
          <ul className="footer_links">
            {footerBottomLine.footerBottomLinks.map((link, index) => 
              <li key={index}><Link to={link[0]}>{link[1]}</Link></li>)}
          </ul>
        </div>
      </div>
    </footer>
  )
}