import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {addToCart, ICartItem, removeFromCart} from '../redux/cartSlice'
import {TProductItemArr} from "./MainPageProductItems";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";


interface IProductItem {
  itemInfo: TProductItemArr
}

export const ProductItem: React.FC<IProductItem> = ({itemInfo}) => {
  const [addedToCart, setAddedToCart] = useState(false)
  
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  
  function isProductIdInArray(productId: number, arrayOfObjects: ICartItem[]) {
    return arrayOfObjects.some(obj => obj.id === productId);
  }
  
  useEffect(() => {
    if (isProductIdInArray(id, cartItems)) {
      setAddedToCart(true)
    }
  }, [cartItems]);
  
  if (!itemInfo) {
    return null;
  }
  
  const [id, productImage, name, price, priceUnit, weight, weightUnit] = itemInfo
  
  const addCartItem = () => {
    let newCartItem: ICartItem = {
      "id": id,
      "image": productImage,
      "title": name,
      "price": price,
      "priceUnit": priceUnit,
      "itemCount": 1,
      "weight": weight,
      "weightUnit": weightUnit,
      "cartItemInfo": {
        "sliceType": "",
        "sliceThickness": "",
        "comment": ""
      }
    };
    
    dispatch(addToCart(newCartItem))
    setAddedToCart(true)
  };
  const deleteCartItem = () => {
    dispatch(removeFromCart(id))
    setAddedToCart(false)
  };
  
  
  return (
    <div className="product_item">
      <div className="product_item_img_frame">
        <div className="product_item_img lozad" style={{backgroundImage: `url(../${productImage})`}}/>
        {
          addedToCart ? <button className="fancybox product_buy" type="button" onClick={deleteCartItem}>
            <span>Удалить из КОРЗИНы</span>
          </button> : <button className="fancybox product_buy" type="button" onClick={addCartItem}>
            <img src="../img/circular_plus.svg" alt="ico"/><span>ДОБАВИТЬ В КОРЗИНУ</span>
          </button>
        }
      </div>
      <div className="product_item_body">
        <Link to={`/product/${id}`} className="product_item_title">{name}</Link>
        <div className="product_item_pice">
          <ins className="strong">{`${price} ${priceUnit}`}</ins>
          <span>&nbsp; - &nbsp; {`${weight} ${weightUnit}`}</span></div>
      </div>
    </div>
  )
}