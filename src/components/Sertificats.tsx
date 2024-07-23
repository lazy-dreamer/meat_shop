import React, {useEffect, useState, useRef} from "react";
import {Preloader} from "./Preloader";
import Slider from "react-slick";
import Fancybox from "./Fancybox";

interface IsertSection {
  "sectionInfo": IsertSectionIn
}

interface IsertSectionIn {
  "sectionName": string;
  "sectionTitle": string;
  "sertBlocks": string[][]
}

export const Sertificats: React.FC<IsertSection> = ({sectionInfo}) => {
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
  
  const [sectionData, setSectionData] = useState<IsertSectionIn>({
    "sectionName": '',
    "sectionTitle": '',
    "sertBlocks": [
      []
    ]
  });
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setSectionData(sectionInfo);
    setSpinner(false);
  }, []);
  let spinnerClass = "section_min_height";
  let {sectionName, sectionTitle, sertBlocks} = sectionData;
  
  return spinner ? (
    <Preloader customClass={spinnerClass}/>
  ) : (
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
          <Fancybox
            options={{
              Carousel: {
                infinite: false
              }
            }}
          >
            <Slider ref={sliderRef} {...settings}>
              {sertBlocks.map((slide, index: number) => (
                <div key={index}>
                  <div className="populars_slide product_item">
                    <a className="product_item_img_frame larger" data-fancybox="gallery" href={slide[0]}><span
                      className="product_item_img" style={{backgroundImage: `url(${slide[0]})`}}/></a>
                    <div className="product_item_body text_center">
                      <div className="product_item_title">{slide[1]}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </Fancybox>
        </div>
      </div>
    </section>
  );
}