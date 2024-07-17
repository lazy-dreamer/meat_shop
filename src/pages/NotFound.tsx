import React, {useEffect, useState} from "react";
import {Preloader} from "../components/Preloader";
import {Link} from "react-router-dom";
import {ContentService} from "../services/content.service";
import decorImage from "../img/nf_decor_img.webp"
import nfImage from "../img/404.svg"
import nfDecorImage from "../img/404_decor_img.webp"

interface INotFound {
  sectionName: string;
  sectionTitle: string;
  sectionSubTitle: string;
  sectionDecorImg: string;
  sectionImg: string;
}

export const NotFound: React.FC = () => {
  const [sectionData, setSectionData] = useState<INotFound | undefined>();
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const sectionsData = await ContentService.getNotFound()
      
      setSectionData(sectionsData)
      setSpinner(false);
    }
    fetchData()
  }, []);
  
  let spinnerClass = 'section_min_height';
  if (spinner || !sectionData) {
    return <Preloader customClass={spinnerClass}/>
  }
  let {sectionName, sectionTitle, sectionSubTitle} = sectionData;
  
  return (
    <section data-title={sectionName} className="section-cart remove_pt remove_pb">
      <div className="section_bg">
        <img className="nf_decor" src={decorImage} alt="decor"/>
        <div className="bg_noise"/>
      </div>
      <div className="screen_content">
        <div className="thanks_sides half_sides nf_sides">
          <div className="thanks_side content_side">
            <div className="main_title_wrapper">
              <div className="main_title">{sectionTitle}</div>
              <div className="simple_text">
                <p>{sectionSubTitle}</p>
              </div>
            </div>
            <div className="main_btn_wrapper thanks_sides_btn"><Link className="main_btn filled" to="/"><span
              className="main_btn_inner">На главную</span></Link></div>
          </div>
          <div className="thanks_side image_side">
            <div className="nf_img_frame">
              <img className="nf_decor_img" src={nfDecorImage} alt="decor"/>
              <img className="nf_img" src={nfImage} alt="404"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}