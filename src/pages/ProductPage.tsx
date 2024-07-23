import React, {useEffect, useState} from "react";
import Select from "react-select";
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

const sliceTypesOptions = [
  {value: 'Способ нарезки', label: 'Способ нарезки', isDisabled: true},
  {value: 'Без нарезки', label: 'Без нарезки'},
  {value: 'Слайсами', label: 'Слайсами'},
  {value: 'Большими кусками', label: 'Большими кусками'},
  {value: 'Стейки', label: 'Стейки'},
  {value: 'На шашлык', label: 'На шашлык'},
]
const sliceThicknessOptions = [
  {value: 'Толщина нарезки', label: 'Толщина нарезки', isDisabled: true},
  {value: 'Стандартно', label: 'Стандартно'},
  {value: '1 см', label: '1 см'},
  {value: '2 см', label: '2 см'},
  {value: '3 см', label: '3 см'}
]

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
  let itemInCart = cartItems.find((el: any) => el.id === Number(id))
  
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
  }, [id]);
  useEffect(() => {
    calculateTotalPrice()
  }, [totalWeight]);
  
  useEffect(() => {
    if (product !== undefined) {
      if (isInCart) {
        
        setCartProductCount(itemInCart.itemCount * productWeight);
        
        setFieldsData(
          prev => ({
            ...prev,
            sliceType: itemInCart.cartItemInfo.sliceType,
            sliceThickness: itemInCart.cartItemInfo.sliceThickness
          })
        )
        
      } else {
        setCartProductCount(productWeight);
      }
    }
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
                        <Select
                          defaultValue={isInCart ? sliceTypesOptions.find(item => item.value === itemInCart.cartItemInfo.sliceType) : sliceTypesOptions[0]}
                          onChange={(opt) => {
                            if (opt) {
                              setFieldsData(prev => ({...prev, sliceType: opt.value}))
                            }
                          }}
                          name="slice types"
                          classNamePrefix="react-select"
                          placeholder="Способ нарезки"
                          options={sliceTypesOptions}
                        />
                      </div>
                    </div>
                    <div className="form_element half">
                      <div className="select_wrapper">
                        <Select
                          defaultValue={isInCart ? sliceThicknessOptions.find(item => item.value === itemInCart.cartItemInfo.sliceThickness) : sliceThicknessOptions[0]}
                          onChange={(opt) => {
                            if (opt) {
                              setFieldsData(prev => ({...prev, sliceThickness: opt.value}))
                            }
                          }}
                          classNamePrefix="react-select"
                          placeholder="Толщина нарезки"
                          name="slice thickness"
                          options={sliceThicknessOptions}
                        />
                      </div>
                    </div>
                  </>
                }
                
                <div className="form_element">
                  <textarea
                    name=""
                    onChange={(e) => setFieldsData(prev => ({...prev, comment: e.target.value}))}
                    defaultValue={isInCart ? itemInCart.cartItemInfo.comment : fieldsData.comment}
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