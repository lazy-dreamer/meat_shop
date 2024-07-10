import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {CartContext} from "../providers/CartProvider";
import {logDOM} from "@testing-library/react";

export function ProductItem({itemInfo}) {
  // console.log(itemInfo)
  const { cartItems, setCartItems } = useContext(CartContext);
  const [addedToCart, setAddedToCart] = useState(false)
  
  function isProductIdInArray(productId, arrayOfObjects) {
    return arrayOfObjects.some(obj => obj.id === productId);
  }
  useEffect(() => {
    if(isProductIdInArray(id, cartItems)) {
      setAddedToCart(true)
    }
  }, []);
  
  if (itemInfo == undefined) {
    return ['undefined', 'undefined', 'undefined', 'undefined', 'undefined']
  }
  const [id, productImage, name, price, priceUnit, weight, weightUnit ] = itemInfo

  const addCartItem = () => {
    let newCartItem = {
      "id": id,
      "image": productImage,
      "title": name,
      "price": price,
      "priceUnit":priceUnit,
      "itemCount": 1,
      "weight": weight,
      "weightUnit":weightUnit,
      "cartItemInfo": {
        "sliceType": "",
        "sliceThickness": "",
        "comment": ""
      }
    };
    setCartItems([...cartItems, newCartItem]);
    setAddedToCart(true)
  };
  const deleteCartItem = () => {
    let newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems([...newCartItems]);
    setAddedToCart(false)
  };

  

  return (
    <div className="product_item">
      <div className="product_item_img_frame">
        <div className="product_item_img lozad" style={{backgroundImage: `url(../${productImage})`}} />
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