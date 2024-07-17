import React, {useContext, useEffect, useState} from "react";
import {Preloader} from "../components/Preloader";
import {ContentService} from "../services/content.service";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

interface IThanks {
  sectionName: string;
  sectionTitle: string;
  image: string;
  textLines: string[]
}

export const Thanks: React.FC = () => {
  const [sectionData, setSectionData] = useState<IThanks | undefined>();
  const [spinner, setSpinner] = useState(true);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      const sectionsData = await ContentService.getThanksSections()
      setSectionData(sectionsData)
      console.log(sectionsData)
      setSpinner(false);
    }
    fetchData()
    
    // localStorage.setItem('cartDiscount', JSON.stringify({
    //   d_code: '',
    //   d_var: 0,
    //   d_val: 0
    // }));
    // setCartItems([])
    
    setTimeout(function () {
      navigate('/')
    }, 5000)
    
  }, []);
  let spinnerClass = 'section_min_height';
  if (spinner || !sectionData) {
    return <Preloader customClass={spinnerClass}/>
  }
  let {sectionName, sectionTitle, textLines, image} = sectionData;
  // console.log(sectionData)
  return (
    <section data-title={sectionName} className="section-cart remove_pt remove_pb">
      <div className="section_bg">
        <div className="bg_noise"/>
      </div>
      <div className="screen_content">
        <div className="thanks_sides half_sides">
          <div className="thanks_side content_side">
            <div className="main_title_wrapper">
              <div className="main_title">{sectionTitle}</div>
              <div className="simple_text">
                {
                  textLines.map((line: string, index: number) => <p key={index}>{line}</p>)
                }
              </div>
            </div>
            <div className="main_btn_wrapper thanks_sides_btn">
              <Link className="main_btn filled" to="/"><span
                className="main_btn_inner">На главную</span></Link>
            </div>
          </div>
          <div className="thanks_side image_side">
            <div className="thanks_image" style={{background: `url(../${image})center/cover no-repeat`}}/>
          </div>
        </div>
      </div>
    </section>
  )
}