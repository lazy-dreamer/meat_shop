import React, {useEffect, useState} from "react";
import {Preloader} from "./Preloader";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import {IPopulars} from "../pages/MainPage";

interface IMainPagePopulars {
  sectionInfo: IPopulars
}

export const MainPagePopulars: React.FC<IMainPagePopulars> = ({sectionInfo}) => {
  let sliderRef = React.useRef<Slider>(null);
  const next = () => {
    sliderRef?.current?.slickNext();
  };
  const previous = () => {
    sliderRef?.current?.slickPrev();
  };
  let settings = {
    infinite: true,
    dots: false,
    arrows: false,
    slidesToShow: 4,
    autoplay: false,
    draggable: false,
    swipe: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  
  const [sectionData, setSectionData] = useState<IPopulars | undefined>();
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setSectionData(sectionInfo);
    setSpinner(false);
  }, []);
  let spinnerClass = "section_min_height";
  if (spinner || !sectionData) {
    return <Preloader customClass={spinnerClass}/>
  }
  let {sectionName, sectionTitle, popularCategories} = sectionData;
  
  return (
    <section className="section-populars" data-title={sectionName}>
      <div className="bg_noise"/>
      <div className="screen_content">
        <div className="main_title_wrapper sides mobile_sides">
          <div className="main_title">{sectionTitle}</div>
          
          <div className="slider_controls slider_controls__js">
            <button className="slider_control prev" onClick={previous}>
              <img src="img/chevron_left.svg" alt="ico"/>
            </button>
            <button className="slider_control next" onClick={next}>
              <img src="img/chevron_right.svg" alt="ico"/>
            </button>
          </div>
        </div>
        <div className="populars_slider_wrapper">
          <Slider ref={sliderRef} {...settings}>
            {popularCategories.map((slide, index) => (
              <div key={index}>
                <Link className="populars_slide product_item" to={`category/${slide.link}`}>
                  <span className="product_item_img_frame">
                    <span
                      className="product_item_img lozad"
                      style={{backgroundImage: `url(${slide.bgImage})`}}
                    />
                  </span>
                  <span className="product_item_body text_center">
                    <span className="product_item_title">{slide.name}</span>
                  </span>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
