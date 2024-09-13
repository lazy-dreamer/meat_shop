import React, { useEffect, useState } from "react";
import { Preloader } from "./Preloader";
import { Link } from "react-router-dom";
import { ContentService } from "../services/content.service";
import logo from "../img/main_logo.svg";

interface IFooterLink {
  title: string;
  links: [string, string][];
}

interface IFooterTop {
  logoLink: string;
  logoDescription: string;
  footerCols: IFooterLink[];
  socials: [string, string][];
}

interface IFooterBottom {
  copyright: string;
  footerBottomLinks: [string, string][];
}

interface IFooterData {
  footerBottomLine: IFooterBottom;
  footerTopLine: IFooterTop;
}

export const Footer: React.FC = () => {
  const [sectionData, setSectionData] = useState<IFooterData>();
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await ContentService.getFooter();
        setSectionData(data);
        setSpinner(false);
      } catch (error) {
        console.error("Failed to fetch footer data", error);
      }
    };
    fetchData();
  }, []);

  const spinnerClass = "footer_preloader";

  if (spinner || !sectionData) {
    return <Preloader customClass={spinnerClass} />;
  }

  const { footerBottomLine, footerTopLine } = sectionData;

  return (
    <footer className="footer lighter_bg">
      <div className="bg_noise" />
      <div className="screen_content">
        <div className="footer_line top_line">
          <div className="footer_content">
            <div className="footer_content_left">
              <div className="main_logo">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <p>{footerTopLine.logoDescription}</p>
            </div>
            <div className="footer_content_right">
              {footerTopLine.footerCols.map((col, index) => (
                <div className="footer_content_col" key={index}>
                  <div className="footer_col_title">{col.title}</div>
                  <ul className="footer_list">
                    {col.links.map((link, index) => (
                      <li key={index}>
                        <Link to={link[0]}>{link[1]}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="footer_line bottom_line">
          <div className="copyright">{footerBottomLine.copyright}</div>
          <ul className="footer_links">
            {footerBottomLine.footerBottomLinks.map((link, index) => (
              <li key={index}>
                <Link to={link[0]}>{link[1]}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
