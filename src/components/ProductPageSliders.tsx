import React, {useState, useEffect, useRef} from "react";
import Slider from "react-slick";

interface ISliders {
  images: string[]
}

export const ProductPageSliders: React.FC<ISliders> = ({images}) => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  let sliderRef1 = useRef<Slider | null>(null);
  let sliderRef2 = useRef<Slider | null>(null);
  
  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);
  return (
    <>
      <div className="product_main_slider_wrapper">
        <Slider
          asNavFor={nav2 as any}
          ref={sliderRef1}
          dots={false}
          arrows={false}
          slidesToShow={1}
          autoplay={false}
          swipeToSlide={true}
          slidesToScroll={1}
        >
          {
            images.map((image: string, index: number) => <div key={index}>
              <div className="product_main_slide lozad" style={{backgroundImage: `url(../${image})`}}/>
            </div>)
          }
        </Slider>
      </div>
      <div className="product_thumb_slider_wrapper">
        <Slider
          asNavFor={nav1 as any}
          ref={sliderRef2}
          infinite={true}
          dots={false}
          arrows={false}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
          autoplay={false}
          slidesToScroll={1}
        >
          {
            images.map((image: string, index: number) => <div key={index}>
              <div className="product_thumb_slide lozad" style={{backgroundImage: `url(../${image})`}}>
              </div>
            </div>)
          }
        </Slider>
      </div>
    </>
  );
}