import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {CartItem} from "../components/CartItem";
import {ProductService} from "../services/product.service";
import {ICartDiscount, ICartItem} from "../redux/cartSlice";

let discountFile: ICartDiscount = {
  d_code: '',
  d_var: 0,
  d_val: 0
}

export function Cart() {
  const cartItems: any = [];
  const [cartTotal, setCartTotal] = useState(0);
  
  const [cartDiscountData, setCartDiscountData] = useState(discountFile);
  const [cartDiscount, setCartDiscount] = useState(0);
  const [discountVariants, setDiscountVariants] = useState([]);// варіанти промо кодів
  const [promoCodeField, setPromoCodeField] = useState('');
  const [promoCodeActivate, setPromoCodeActivate] = useState(false);
  const [promoCodeError, setPromoCodeError] = useState(false);
  
  // useEffect(() => {
  //   const fetchPromos = async () => {
  //     const data = await ProductService.getDiscounts()
  //     setDiscountVariants(data)
  //   }
  //   fetchPromos()
  //  
  //   let discountData = JSON.parse(localStorage.getItem('cartDiscount'));
  //   if (discountData == null) {
  //     discountData = discountFile
  //   }
  //   if (discountData.d_var !== 0) {
  //     setPromoCodeActivate(true)
  //   }
  //   // console.log(discountData)
  //   setCartDiscountData(discountData)
  // }, []);
  
  // useEffect(() => {
  //   let localTotal = JSON.parse(localStorage.getItem('cartTotalPrice'));
  //   let discountData = JSON.parse(localStorage.getItem('cartDiscount'));
  //   setCartTotal(localTotal)
  //   setCartDiscount(discountData.d_val)
  // }, [cartItems, cartDiscountData]);
  
  function deleteCartItem(id: number) {
    // let newCartItems = cartItems.filter((item) => item.id !== id);
    // //setCartItems([...newCartItems]);
    // if (newCartItems.length === 0) {
    //   removeDiscount()
    // }
  }
  
  function promoError() {
    setPromoCodeError(true)
    setTimeout(function () {
      setPromoCodeError(false)
    }, 2000)
  }
  
  function promoSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // if (promoCodeField.length > 0 && cartItems.length > 0) {
    //   let promCheckRes = discountVariants.filter((item) => item[0] === promoCodeField)
    //   if (promCheckRes === undefined || promCheckRes.length === 0) {
    //     setCartDiscountData(discountFile)
    //     localStorage.setItem('cartDiscount', JSON.stringify(discountFile));
    //     setPromoCodeActivate(false)
    //     promoError()
    //   } else {
    //     let tempDiscountVal = promCheckRes[0][1];
    //     if (promCheckRes[0][0].toString().indexOf('%') > -1) {
    //       tempDiscountVal = (cartTotal * promCheckRes[0][1]) / 100
    //     }
    //     let d_obj = {
    //       d_code: promCheckRes[0][0],
    //       d_var: promCheckRes[0][1],
    //       d_val: tempDiscountVal
    //     }
    //     setCartDiscountData(d_obj)
    //     setPromoCodeActivate(true)
    //     localStorage.setItem('cartDiscount', JSON.stringify(d_obj));
    //   }
    //   setPromoCodeField('')
    // } else {
    //   promoError()
    // }
  }
  
  function removeDiscount() {
    setCartDiscountData(discountFile)
    localStorage.setItem('cartDiscount', JSON.stringify(discountFile));
    setPromoCodeActivate(false)
  }
  
  
  return (
    <section className="section-cart">
      <div className="section_bg">
        <div className="bg_noise"/>
      </div>
      <div className="screen_content">
        <div className="main_title_wrapper">
          <div className="main_title">Корзина</div>
        </div>
        <div className="cart_sides">
          <div className="cart_side content_side">
            <div className="cart_block heading_block">
              <div className="cart_item">
                <div className="cart_item_cell main_cell">
                  <p>Товар</p>
                </div>
                <div className="cart_item_cell price_cell">
                  <p>Цена</p>
                </div>
                <div className="cart_item_cell quant_cell">
                  <p>Колл-во</p>
                </div>
                <div className="cart_item_cell price_cell">
                  <p>Итог</p>
                </div>
              </div>
            </div>
            <div className="cart_blocks bottom_offset">
              {
                cartItems.length > 0 ? (cartItems.map((item: ICartItem, index: number) => <CartItem key={index}
                                                                                                    deleteItem={deleteCartItem}
                                                                                                    item={item}/>)) :
                  <p className="empty_cart_message">Корзина пуста!</p>
              }
            </div>
            
            <div className="controll_buttons">
              <Link className="main_btn filled" to="/catalog"><span className="main_btn_inner">В каталог</span></Link>
              {
                cartItems.length > 0 && (
                  <Link className="main_btn" to="/checkout"><span className="main_btn_inner">Перейти к оформлению</span></Link>)
              }
            </div>
          
          </div>
          <div className="cart_side aside_side">
            <div className="aside_side_frame">
              <div
                className="aside_side_frame_title">{cartItems.length > 0 ? (`В вашей корзине ${cartItems.length} товара`) : "Корзина пуста!"}</div>
              <ul className="price_list bottom_bordered top_bordered">
                <li className="price_li_sides">
                  <p>Сумма заказа:</p>
                  <p><strong>{cartTotal} ₪</strong></p>
                </li>
                <li className="price_li_sides">
                  <p>Скидка:</p>
                  <p>
                    {promoCodeActivate &&
                    <button type="button" className="remove_discount" onClick={() => removeDiscount()}>(удалить
                      код {cartDiscountData.d_code})</button>}
                    <strong>{cartDiscount} ₪</strong></p>
                </li>
              </ul>
              <div className="floating_cart_total_sides">
                <p>Итог по заказу:</p><strong>{cartTotal - cartDiscount} ₪</strong></div>
            </div>
            {!promoCodeActivate && <div className="aside_side_frame">
              <div className="aside_side_frame_title">Промокод на скидку</div>
              <form className="promo_frame" onSubmit={(e) => promoSubmit(e)} action="">
                <input className={promoCodeError ? "promo_field error" : "promo_field"} type="text"
                       placeholder="Введите промокод " name="" value={promoCodeField}
                       onChange={(e) => setPromoCodeField(e.target.value.toLowerCase())}/>
                <button className="promo_btn" type="submit"><span>OK</span></button>
              </form>
            </div>}
          </div>
        </div>
      </div>
    </section>
  )
}