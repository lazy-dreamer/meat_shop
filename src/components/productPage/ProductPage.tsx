import React, {useContext, useEffect, useState} from "react";
import {Preloader} from "../Preloader";
import {Link, useParams} from "react-router-dom";
import Slider from "react-slick";
import {ProductService} from '../../services/product.service'
import {QuantityCounter} from "../QuantityCounter";
import {CartContext} from "../../providers/CartProvider";
import {logDOM} from "@testing-library/react";


export function ProductPage() {
  const {id} = useParams();
  const [ product, setProduct ] = useState('');
  const [ spinner, setSpinner ] = useState(true);
  const [ productWeight, setProductWeight ] = useState('');
  const [ productPrice, setProductPrice ] = useState('');
  
  const [ totalWeight, setTotalWeight ] = useState('');
  const [ totalPrice, setTotalPrice ] = useState('');
  const [ fieldsData, setFieldsData ] = useState({
    sliceType: '',
    sliceThickness: '',
    comment: ''
  });
  
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const data = await ProductService.getById(id)
      setProduct(data)
      setProductWeight(data.weight)
      setProductPrice(data.price)
      setSpinner(false)
      setTotalPrice(data.price)
    }
    fetchData()
  }, [id]);
  useEffect(() => {
    calculateTotalPrice()
  }, [totalWeight]);
  let spinnerClass = 'section_min_height';
  let {name, images, price, priceUnit, weight, weightUnit, description, features} = product;
  let priceIncrease = parseInt((parseFloat(totalWeight) / productWeight).toFixed());
  
  const calculateTotalPrice = function() {
    if (isNaN(priceIncrease)) {
      priceIncrease = 1
    }
    setTotalPrice(priceIncrease * productPrice)
  }

  const { cartItems, setCartItems } = useContext(CartContext);

  function isProductIdInArray(productId, arrayOfObjects) {
    return arrayOfObjects.some(obj => obj.id === productId);
  }
  function getItemCountById(id, arrayOfObjects) {
    for (const obj of arrayOfObjects) {
      if (obj.id === id) {
        return obj.itemCount;
      }
    }
    return null;
  }
  
  const addCartItem = () => {
    let newCartItem = {
      "id": parseInt(id),
      "image": images[0],
      "title": name,
      "price": price,
      "priceUnit":priceUnit,
      "itemCount": totalPrice/price,
      "weight": weight,
      "weightUnit":weightUnit,
      "cartItemInfo": fieldsData
    };

    if(isProductIdInArray(parseInt(id), cartItems)) {
     let newCartItems = cartItems.filter((item) => item.id !== parseInt(id));
     let itemCountInCart = getItemCountById(parseInt(id), cartItems);
     let newCartItem2 = {
        ...newCartItem,
        itemCount: (totalPrice/price) + itemCountInCart
      };
      setCartItems([...newCartItems, newCartItem2]);
    } else {
      setCartItems([...cartItems, newCartItem]);
    }
  };
  

  // console.log(totalWeight)
  
  return (
    spinner ? <Preloader customClass={spinnerClass} /> : <section className="section-product">
      <div className="bg_noise"></div>
      <div className="screen_content">
        <ul className="breadcrumbs_list negative_top with_offset">
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/catalog">Каталог продукции</Link></li>
          <li><span>{name}</span></li>
        </ul>
        <div className="product_card_sides half_sides">
          <div className="product_card_side sliders_side">
            <div className="product_main_slider_wrapper">
              {
                images.length>0 && <Slider
                  asNavFor={nav2}
                  ref={(slider) => setNav1(slider)}
                  infinite={true}
                  dots={false}
                  arrows={false}
                  slidesToShow={1}
                  autoplay={false}
                  swipeToSlide={true}
                  slidesToScroll={1}
                >
                  {
                    images.map((image, index) => <div key={index}>
                      <div className="product_main_slide lozad" style={{backgroundImage: `url(../${image})`}} />
                    </div>)
                  }
                </Slider>
              }
            </div>
            <div className="product_thumb_slider_wrapper">
              {
                images.length>0 && <Slider
                  asNavFor={nav1}
                  ref={(slider) => setNav2(slider)}
                  infinite={true}
                  dots={false}
                  arrows={false}
                  slidesToShow={3}
                  autoplay={false}
                  swipeToSlide={true}
                  slidesToScroll={1}
                  focusOnSelect={true}
                >
                  {
                    images.map((image, index) => <div key={index}>
                      <div className="product_thumb_slide lozad" style={{backgroundImage: `url(../${image})`}}>
                      </div>
                    </div>)
                  }
                </Slider>
              }
            </div>
          </div>
          <div className="product_card_side content_side">
            <div className="main_title_wrapper small_offset">
              <p>В наличии</p>
              <div className="main_title">{name}</div>
            </div>
            <div className="bottom_offset smaller top_bordered bottom_bordered product_card_price">
              
              <QuantityCounter weight={productWeight} increment={productWeight} unit={weightUnit} callback={setTotalWeight} />
              
              <div className="product_item_pice">
                <p>
                  <ins className="strong">{totalPrice} {priceUnit}</ins>
                </p>
                <p><span>{price} {priceUnit} / {weight} {weightUnit}</span></p>
              </div>
            </div>
            <form className="bottom_offset smaller" action="">
              <div className="form_elements">
                {
                  product.type.includes("stuffing") ? '' : <><div className="form_element half">
                      <div className="select_wrapper">
                        <select className="select" name="" onChange={(e) => setFieldsData(prev => ({...prev, sliceType: e.target.value}))}>
                          <option value="Способ нарезки" disabled="disabled" defaultValue>Способ нарезки</option>
                          <option value="Без нарезки">Без нарезки</option>
                          <option value="Слайсами">Слайсами</option>
                          <option value="Большими кусками">Большими кусками</option>
                          <option value="Стейки">Стейки</option>
                          <option value="На шашлык">На шашлык</option>
                        </select>
                      </div>
                    </div><div className="form_element half">
                      <div className="select_wrapper">
                        <select className="select" name="" onChange={(e) => setFieldsData(prev => ({...prev, sliceThickness: e.target.value}))}>
                          <option value="Толщина нарезки" disabled="disabled" defaultValue>Толщина нарезки</option>
                          <option value="Стандартно">Стандартно</option>
                          <option value="1 см">1 см</option>
                          <option value="2 см">2 см</option>
                          <option value="3 см">3 см</option>
                        </select>
                      </div>
                    </div></> 
                }
                
                <div className="form_element">
                  <textarea name="" onChange={(e) => setFieldsData(prev => ({...prev, comment: e.target.value}))} placeholder="Комментарий мяснику" />
                </div>
                <div className="form_element">
                  <button className="main_btn wide" type="button" onClick={addCartItem}>
                    <span className="main_btn_inner">Добавить в корзину</span>
                  </button>
                </div>
              </div>
            </form>
            <div className="simple_text bottom_offset">
              <h3>Описание</h3>
              {
                description.map((line, index) => <p key={index}>{line}</p>)
              }
            </div>
            <ul className="feature_list bottom_offset">
              {
                features.map((line, index) => 
                  <li key={index} className="feature_li">
                    <p>{line[0]}</p>
                    <div className="feature__separator" />
                    <p><strong>{line[1]}</strong></p>
                  </li>
                )
              }
            </ul>
            <div className="main_btn_wrapper">
              <Link className="main_btn filled" to="/"><span className="main_btn_inner">Вернуться на главную</span></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}