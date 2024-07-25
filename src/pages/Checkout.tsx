import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {CartItemDescription} from "../components/CartItemDescription";
import {CheckoutForm} from "../components/CheckoutForm";
import {clearDiscount, ICartItem, removeFromCart} from "../redux/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";

export interface IOrderInfo {
  cartItems: string[];
  cartTotalWithDiscount: number
}

export function Checkout() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const cartDiscount = useSelector((state: RootState) => state.cart.cartDiscount);
  const cartTotal = useSelector((state: RootState) => state.cart.totalCartPrice);
  const dispatch: AppDispatch = useDispatch();
  
  const [orderInfo, setOrderInfo] = useState<IOrderInfo>({
    cartItems: [],
    cartTotalWithDiscount: 0
  })
  
  useEffect(() => {
    let itemsInfo: string[] = cartItems.map((item: ICartItem) => item.title)
    
    setOrderInfo(() => ({
      cartItems: itemsInfo,
      cartTotalWithDiscount: cartTotal - cartDiscount.d_val
    }))
  }, [cartItems, cartDiscount, cartTotal]);
  
  function deleteCartItem(id: number) {
    dispatch(removeFromCart(id))
    
    if (cartItems.length === 0) {
      dispatch(clearDiscount())
    }
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
                    <p><strong>{cartDiscount.d_val} ₪</strong></p>
                  </li>
                </ul>
                <div className="floating_cart_total_sides">
                  <p>Итог по заказу:</p><strong>{cartTotal - cartDiscount.d_val} ₪</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}