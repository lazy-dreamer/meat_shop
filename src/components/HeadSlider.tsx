import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import {Preloader} from "./Preloader";
import {Link} from "react-router-dom";
import {IMainHero} from "../pages/MainPage";

interface IMainPageHeadSlider {
  sectionInfo: IMainHero
}

export const HeadSlider: React.FC<IMainPageHeadSlider> = ({sectionInfo}) => {
  const [sectionData, setSectionData] = useState<IMainHero | undefined>();
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setSectionData(sectionInfo)
    setSpinner(false)
  }, []);
  let spinnerClass = 'section_min_height';
  if (spinner || !sectionData) {
    return <Preloader customClass={spinnerClass}/>
  }
  let settings = {
    infinite: true,
    dots: false,
    arrows: false,
    slidesToShow: 1,
    autoplay: false,
  };
  const {sectionName, slider} = sectionData;
  
  return (
    <section className="section-head remove_pt remove_pb" data-title={sectionName}>
      <Slider {...settings}>
        {slider?.map((slide, index) =>
          <div key={index}>
            <div className="head_slide">
              <div className="section_bg lozad" style={{backgroundImage: `url(${slide.slideBg})`}}>
                <div className="bg_noise"/>
              </div>
              <div className="head_slide_sides">
                <div className="head_slide_side content_side">
                  <div className="head_slide_container">
                    <div className="head_slide_content">
                      <div className="main_title size_lg">{slide.slideTitle}</div>
                      <div className="head_bottom_sides">
                        <Link to="/catalog" className="more_btn">
                          <span className="more_btn_text with_line">УЗНАТЬ БОЛЬШЕ</span>
                          <span className="more_btn_ico">
                              <img src="img/chevron_right2.svg" alt="ico"/>
                            </span>
                        </Link>
                        <div className="simple_text head_descr">
                          <p>{slide.slideDescription}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="head_slide_side aside_side">
                  <div className="head_aside_product">
                    <div className="head_side_heading">
                      <div className="head_side_title">
                        {slide.slideProduct.productTopTitle}
                      </div>
                      <div className="head_side_num">
                        {index + 1 < 10 ? "0" + (index + 1) : index + 1}
                      </div>
                    </div>
                    <div className="product_item_img_frame">
                      <div
                        className="product_item_img lozad"
                        style={{backgroundImage: `url(${slide.slideProduct.productImage})`}}
                      />
                    </div>
                    <div className="head_side_info">
                      <Link className="product_item_title" to={`/product/${slide.slideProduct.productId}`}>
                        {slide.slideProduct.productBottomTitle}
                      </Link>
                      <div className="white_pill">
                        <ins>{slide.slideProduct.productPrice}</ins>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Slider>
    </section>
  )
}