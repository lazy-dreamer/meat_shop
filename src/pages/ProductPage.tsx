import React, {useEffect, useState} from "react";
import {Preloader} from "../components/Preloader";
import {Link, useParams} from "react-router-dom";
import {ProductService} from '../services/product.service'
import {QuantityCounter} from "../components/QuantityCounter";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {addToCart, changeCartItem, ICartItem} from "../redux/cartSlice";
import {ProductPageSliders} from "../components/ProductPageSliders";

interface IProductPage {
  id: number,
  name: string;
  productImage: string;
  images: string[];
  price: number,
  priceUnit: string;
  weight: number;
  weightUnit: string;
  link: string;
  description: string[];
  features: [string, string][],
  type: string[]
}

export function ProductPage() {
  const {id} = useParams();
  
  const [product, setProduct] = useState<IProductPage | undefined>();
  const [spinner, setSpinner] = useState(true);
  const [productWeight, setProductWeight] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fieldsData, setFieldsData] = useState({
    sliceType: '',
    sliceThickness: '',
    comment: ''
  });
  const [cartProductCount, setCartProductCount] = useState(1)
  
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch: AppDispatch = useDispatch();
  let priceIncrease = parseInt((parseFloat(totalWeight.toString()) / productWeight).toFixed());
  
  let isInCart = isProductIdInCart(Number(id), cartItems)
  
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const data: any = await ProductService.getById(Number(id))
      setProduct(data)
      setProductWeight(data.weight)
      setCartProductCount(data.weight)
      setProductPrice(data.price)
      setSpinner(false)
      setTotalPrice(data.price)
    }
    fetchData()
    // console.log('id')
  }, [id]);
  useEffect(() => {
    calculateTotalPrice()
    // console.log('totalWeight')
  }, [totalWeight]);
  
  useEffect(() => {
    if (product !== undefined) {
      if (isInCart) {
        let itemInCart = cartItems.find((el: any) => el.id === Number(id))
        setCartProductCount(itemInCart.itemCount * productWeight);
        
      } else {
        setCartProductCount(productWeight);
      }
    }
    // console.log('product')
  }, [id, product, cartItems]);
  
  
  let spinnerClass = 'section_min_height';
  if (spinner || !product) {
    return <Preloader customClass={spinnerClass}/>
  }
  
  let {name, images, price, priceUnit, weight, weightUnit, description, features} = product;
  
  function calculateTotalPrice() {
    if (isNaN(priceIncrease)) {
      priceIncrease = 1
    }
    setTotalPrice(priceIncrease * productPrice)
  }
  
  function isProductIdInCart(productId: number, arrayOfObjects: any[]) {
    return arrayOfObjects.some(obj => obj.id === productId);
  }
  
  const addCartItem = () => {
    let newCartItem = {
      "id": Number(id),
      "image": images[0],
      "title": name,
      "price": price,
      "priceUnit": priceUnit,
      "itemCount": totalPrice / price,
      "weight": weight,
      "weightUnit": weightUnit,
      "cartItemInfo": fieldsData
    };
    
    if (isInCart) {
      let payloadItem = {
        ...newCartItem,
        itemCount: totalPrice / price
      };
      dispatch(changeCartItem(payloadItem));
    } else {
      dispatch(addToCart(newCartItem))
    }
  };
  
  // console.log(totalWeight)
  
  
  return (
    <section className="section-product">
      <div className="bg_noise"/>
      <div className="screen_content">
        <ul className="breadcrumbs_list negative_top with_offset">
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/catalog">Каталог продукции</Link></li>
          <li><span>{name}</span></li>
        </ul>
        <div className="product_card_sides half_sides">
          <div className="product_card_side sliders_side">
            <ProductPageSliders images={images}/>
          </div>
          <div className="product_card_side content_side">
            <div className="main_title_wrapper small_offset">
              <div className="main_title">{name}</div>
            </div>
            {/*<div className='bottom_offset smaller'>*/}
            {/*  {isInCart && <p>Уже в корзине</p>}*/}
            {/*</div>*/}
            <div className="bottom_offset smaller top_bordered bottom_bordered product_card_price">
              <QuantityCounter
                weight={cartProductCount}
                increment={productWeight}
                unit={weightUnit}
                callback={(e) => setTotalWeight(e)}
              />
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
                  product?.type.includes("stuffing") ? '' : <>
                    <div className="form_element half">
                      <div className="select_wrapper">
                        <select className="select" name=""
                                onChange={(e) => setFieldsData(prev => ({...prev, sliceType: e.target.value}))}>
                          <option value="Способ нарезки" disabled={true} defaultValue='Способ нарезк'>Способ нарезки
                          </option>
                          <option value="Без нарезки">Без нарезки</option>
                          <option value="Слайсами">Слайсами</option>
                          <option value="Большими кусками">Большими кусками</option>
                          <option value="Стейки">Стейки</option>
                          <option value="На шашлык">На шашлык</option>
                        </select>
                      </div>
                    </div>
                    <div className="form_element half">
                      <div className="select_wrapper">
                        <select className="select" name=""
                                onChange={(e) => setFieldsData(prev => ({...prev, sliceThickness: e.target.value}))}>
                          <option value="Толщина нарезки" disabled={true} defaultValue='Толщина нарезки'>Толщина
                            нарезки
                          </option>
                          <option value="Стандартно">Стандартно</option>
                          <option value="1 см">1 см</option>
                          <option value="2 см">2 см</option>
                          <option value="3 см">3 см</option>
                        </select>
                      </div>
                    </div>
                  </>
                }
                
                <div className="form_element">
                  <textarea name="" onChange={(e) => setFieldsData(prev => ({...prev, comment: e.target.value}))}
                            placeholder="Комментарий мяснику"/>
                </div>
                <div className="form_element">
                  <button className="main_btn wide" type="button" onClick={addCartItem}>
                    <span
                      className="main_btn_inner">{isInCart ? 'Изменить значение в корзине' : 'Добавить в корзину'}</span>
                  </button>
                </div>
              </div>
            </form>
            <div className="simple_text bottom_offset">
              <h3>Описание</h3>
              {
                description.map((line: string, index: number) => <p key={index}>{line}</p>)
              }
            </div>
            <ul className="feature_list bottom_offset">
              {
                features.map((line: string[], index: number) =>
                  <li key={index} className="feature_li">
                    <p>{line[0]}</p>
                    <div className="feature__separator"/>
                    <p><strong>{line[1]}</strong></p>
                  </li>
                )
              }
            </ul>
            <div className="main_btn_wrapper">
              <Link className="main_btn filled" to="/"><span
                className="main_btn_inner">Вернуться на главную</span></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}