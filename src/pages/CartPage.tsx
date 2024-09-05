import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {CartItem} from "../components/CartItem";
import {ProductService} from "../services/product.service";
import {clearDiscount, ICartItem, removeFromCart, setDiscount} from "../redux/cartSlice";
import {AppDispatch, RootState} from "../redux/store";
import {useDispatch, useSelector} from "react-redux";


export function CartPage() {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  let discountData = useSelector((state: RootState) => state.cart.cartDiscount)
  let cartTotal = useSelector((state: RootState) => state.cart.totalCartPrice)
  
  const [discountVariants, setDiscountVariants] = useState<[string, number][] | undefined>();
  const [promoCodeField, setPromoCodeField] = useState('');
  const [promoCodeActivate, setPromoCodeActivate] = useState(false);
  const [promoCodeError, setPromoCodeError] = useState(false);
  
  useEffect(() => {
    const fetchPromos = async () => {
      const data: any = await ProductService.getDiscounts()
      setDiscountVariants(data)
    }
    fetchPromos()
    
    if (discountData.d_var !== 0) {
      setPromoCodeActivate(true)
    }
  }, [discountData.d_var]);
  
  
  function deleteCartItem(id: number) {
    dispatch(removeFromCart(id))
  }
  
  function promoError() {
    setPromoCodeError(true)
    setTimeout(function () {
      setPromoCodeError(false)
    }, 2000)
  }
  
  function promoSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (promoCodeField.length > 0 && cartItems.length > 0 && discountVariants) {
      let promCheckRes = discountVariants.filter((item) => item[0] === promoCodeField)
      
      if (promCheckRes === undefined || promCheckRes.length === 0) {
        dispatch(clearDiscount())
        setPromoCodeActivate(false)
        promoError()
      } else {
        let tempDiscountVal = promCheckRes[0][1];
        if (promCheckRes[0][0].includes('%')) {
          tempDiscountVal = (cartTotal * promCheckRes[0][1]) / 100
        }
        let d_obj = {
          d_code: promCheckRes[0][0],
          d_var: promCheckRes[0][1],
          d_val: tempDiscountVal
        }
        dispatch(setDiscount(d_obj))
        setPromoCodeActivate(true)
      }
      setPromoCodeField('')
    } else {
      promoError()
    }
  }
  
  function removeDiscount() {
    dispatch(clearDiscount())
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
                cartItems.length > 0 ?
                  (cartItems.map((item: ICartItem) => <CartItem
                    key={item.id}
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
                      код {discountData.d_code})</button>}
                    <strong>{discountData.d_val} ₪</strong></p>
                </li>
              </ul>
              <div className="floating_cart_total_sides">
                <p>Итог по заказу:</p>
                <strong>{discountData && (cartTotal - discountData.d_val)} ₪</strong>
              </div>
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