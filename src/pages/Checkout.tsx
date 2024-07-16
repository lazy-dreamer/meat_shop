import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {CartItemDescription} from "../components/CartItemDescription";
import {CheckoutForm} from "../components/CheckoutForm";
import {ICartItem} from "../redux/cartSlice";

export interface IOrderInfo {
  cartItems: ICartItem[];
  cartTotalWithDiscount: number
}

export function Checkout() {
  const cartItems: any = [];
  const [cartTotal, setCartTotal] = useState(0);
  const [cartDiscount, setCartDiscount] = useState(0);
  const [orderInfo, setOrderInfo] = useState<IOrderInfo>({
    cartItems: [],
    cartTotalWithDiscount: 0
  })
  
  // useEffect(() => {
  //   let dscntData = JSON.parse(localStorage.getItem('cartDiscount'));
  //   setCartDiscount(dscntData.d_val)
  //  
  //   let localTotal = JSON.parse(localStorage.getItem('cartTotalPrice'));
  //   setCartTotal(localTotal)
  // }, []);
  
  useEffect(() => {
    // let localTotal = JSON.parse(localStorage.getItem('cartTotalPrice'));
    // setCartTotal(localTotal)
    // let dscntData = JSON.parse(localStorage.getItem('cartDiscount'));
    // setCartDiscount(dscntData.d_val)
    //
    // let itemsInfo = cartItems.map(item => item.title)
    // setOrderInfo(() => ({
    //   cartItems: itemsInfo,
    //   cartTotalWithDiscount: localTotal - cartDiscount
    // }))
  }, [cartItems]);
  
  // useEffect(() => {
  //   setOrderInfo((prev) => ({
  //     ...prev,
  //     cartTotalWithDiscount: cartTotal - cartDiscount
  //   }))
  // }, [cartTotal, cartDiscount]);
  
  function deleteCartItem(id: number) {
    // let newCartItems = cartItems.filter((item) => item.id !== id);
    // // setCartItems([...newCartItems]);
    //
    // if (newCartItems.length === 0) {
    //   localStorage.setItem('cartDiscount', JSON.stringify({
    //     d_code: '',
    //     d_var: 0,
    //     d_val: 0
    //   }));
    // }
  }
  
  return (
    <section className="section-cart">
      <div className="section_bg">
        <div className="bg_noise"/>
      </div>
      <div className="screen_content">
        <div className="main_title_wrapper">
          <div className="main_title">Оформление заказа</div>
        </div>
        <div className="checkout_sides">
          <div className="checkout_side content_side">
            <CheckoutForm info={orderInfo}/>
          </div>
          
          <div className="checkout_side aside_side">
            <div className="aside_side_frame">
              <div className="aside_side_frame_title">Ваш заказ</div>
              <div className="cart_frame_blocks">
                {
                  cartItems.map((item: ICartItem, index: number) => <div key={index} className="cart_frame_block">
                    <div className="cf_block">
                      <div className="cf_block_img lozad" style={{backgroundImage: `url(${item.image})`}}/>
                      <div className="cf_block_body">
                        <Link to={`/product/${item.id}`} className="cf_block_title">{item.title}</Link>
                        <div className="simple_text">
                          <CartItemDescription features={item.cartItemInfo}/>
                        </div>
                      </div>
                    </div>
                    <button className="remove_btn" type="button" onClick={() => deleteCartItem(item.id)}>
                      <img src="/img/remove_cross.svg" alt="ico"/>
                    </button>
                  </div>)
                }
              </div>
              <div className="floating_cart_bottom">
                <ul className="price_list bottom_bordered">
                  <li className="price_li_sides">
                    <p>Сумма заказа:</p>
                    <p><strong>{cartTotal} ₪</strong></p>
                  </li>
                  <li className="price_li_sides">
                    <p>Скидка:</p>
                    <p><strong>{cartDiscount} ₪</strong></p>
                  </li>
                </ul>
                <div className="floating_cart_total_sides">
                  <p>Итог по заказу:</p><strong>{cartTotal - cartDiscount} ₪</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}