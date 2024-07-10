import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Preloader} from "./Preloader";
import {ContentService} from "../services/content.service";
import logo from "../img/main_logo.svg";
import phoneImg from "../img/phone.svg";
import controlImg2 from "../img/header_control2.svg";
import {Search} from "./Search";
import {CartContext} from "../providers/CartProvider";

export function Header() {
  const [ sectionData, setSectionData ] = useState('');
  const [ spinner, setSpinner ] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await ContentService.getHeader()
      setSectionData(data)
      setSpinner(false)
    }
    fetchData()
  }, []);
  let spinnerClass = 'header_preloader';
  let {logoLink, navList, headerPhone} = sectionData;
  
  const {cartItems, setCartItems} = useContext(CartContext);
  
  function clearCart(e) {
    e.preventDefault()
    localStorage.setItem('cartDiscount', JSON.stringify({
      d_code: '',
      d_var: 0,
      d_val: 0
    }));
    setCartItems([])
  }

  function getCartTotalPrice() {
    let cartTotalPrice = 0;
    for (let i in cartItems) {
      cartTotalPrice+=(cartItems[i].price*cartItems[i].itemCount)
    }
    localStorage.setItem('cartTotalPrice', JSON.stringify(cartTotalPrice));
    
    let discountData = JSON.parse(localStorage.getItem('cartDiscount'));
    if (discountData == null) {
      discountData = {
        d_code: '',
        d_var: 0,
        d_val: 0
      }
      localStorage.setItem('cartDiscount', JSON.stringify(discountData));
    } else {
      let tmpDiscountVal = discountData.d_val;
      if (discountData.d_code.toString().indexOf('%') > -1) {
        tmpDiscountVal = (cartTotalPrice*discountData.d_var)/100
      }
      let d_obj = {
        d_code: discountData.d_code,
        d_var: discountData.d_var,
        d_val: tmpDiscountVal
      }
      localStorage.setItem('cartDiscount', JSON.stringify(d_obj));
    }
  }
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {
      setCartItems(cartItems);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    getCartTotalPrice()
  }, [cartItems]);

  return (
    spinner ? <header className="header"><Preloader customClass={spinnerClass} /></header> : <header className="header">
      <div className="header_cols">
        <div className="main_logo">
          <Link to="/">
            <img src={logo} alt="logo"/>
          </Link>
        </div>
        <div className="header_middle" id="nav_list">
          <ul className="nav_list">
            {
              navList.map((link, index) =>
                <li key={index}><Link to={link[0]}>{link[1]}</Link></li>)
            }
            <li><p onClick={(e)=>clearCart(e)}>Clear cart!!!</p></li>
          </ul>
        </div>
        <div className="header_right">
          <a className="header_phone" href={headerPhone[0]}><span
          className="header_phone_ico"><img className="svg" src={phoneImg} alt="ico"/></span><span
          className="header_phone_txt">{headerPhone[1]}</span></a>
          
          <ul className="header_controls">
            <li className="head_search_li">
              <Search />
            </li>
            <li>
              <Link className="header_control" to="/cart">
                <img src={controlImg2} alt="ico"/>
                <span className="header_control_count">{cartItems.length}</span>
              </Link>
            </li>
          </ul>
          <a className="header_links_trigger header_links_trigger__js" href="#nav_list">
            <span />
            <span className="transparent" />
            <span />
          </a>
        </div>
      </div>
    </header>
  )
}
