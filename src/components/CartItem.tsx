import React, {memo, useCallback} from "react";
import {QuantityCounter} from "../components/QuantityCounter";
import {Link} from "react-router-dom";
import {CartItemDescription} from "./CartItemDescription";
import {changeCartItem, ICartItem} from '../redux/cartSlice'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";

interface ICartItemComponent {
  item: ICartItem;
  deleteItem: (id: number) => void
}

export const CartItem: React.FC<ICartItemComponent> = memo(({item, deleteItem}) => {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const {cartItemInfo, id, image, itemCount, price, priceUnit, title, weight, weightUnit} = item;
  
  const totalPriceChanger = useCallback((quantWeight: number) => {
    let newCount = Math.round(quantWeight / weight);
    let thisCartItem = cartItems.find((cartItem: ICartItem) => cartItem.id === id);
    
    if (thisCartItem && thisCartItem.itemCount !== newCount) {
      let newCartItem = {...thisCartItem, itemCount: newCount};
      dispatch(changeCartItem(newCartItem));
    }
  }, [cartItems, dispatch, id, weight]);
  
  return (
    <div className="cart_block">
      <div className="cart_item">
        <button className="remove_btn" type="button" onClick={() => deleteItem(id)}>
          <img src="/img/remove_cross.svg" alt="ico"/>
        </button>
        <div className="cart_item_cell main_cell">
          <div className="cf_block">
            <div className="cf_block_img lozad" style={{backgroundImage: `url(${image})`}}/>
            <div className="cf_block_body">
              <Link to={`/product/${id}`} className="cf_block_title">{title}</Link>
              <div className="simple_text">
                <CartItemDescription features={cartItemInfo}/>
              </div>
            </div>
          </div>
        </div>
        <div className="cart_item_cell price_cell cart_item_price">
          <div className="product_item_pice">
            <ins className="strong">{`${price} ${priceUnit}`}</ins>
          </div>
        </div>
        <div className="cart_item_cell quant_cell">
          <QuantityCounter
            key={id} weight={weight * itemCount}
            increment={weight} unit={weightUnit}
            callback={(e) => totalPriceChanger(e)}
          />
        </div>
        <div className="cart_item_cell price_cell cart_total_price">
          <div className="product_item_pice">
            <ins className="strong">{`${price * itemCount} ${priceUnit}`}</ins>
          </div>
        </div>
      </div>
    </div>
  )
})