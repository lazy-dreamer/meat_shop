import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {MainPage} from "../pages/MainPage";
import {AboutPage} from "../pages/AboutPage"
import {NotFound} from "../pages/NotFound"
import {Cart} from "../pages/Cart"
import {Catalog} from "../pages/Catalog"
import {Category} from "../pages/Category"
import {Checkout} from "../pages/Checkout"
import {Contacts} from "../pages/Contacts"
import {Delivery} from "../pages/Delivery"
import {Thanks} from "../pages/Thanks"
import {Header} from "./Header";
import {Footer} from "./Footer";
import {Policy} from "../pages/Policy";
import {Terms} from "../pages/Terms";
import {ProductPage} from "../pages/ProductPage";
import {setCartItems, setCartTotal, setDiscount} from "../redux/cartSlice";
import {AppDispatch, RootState} from "../redux/store";
import {useDispatch, useSelector} from "react-redux";


function App() {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  let cartDiscount = useSelector((state: RootState) => state.cart.cartDiscount);
  useEffect(() => {
    const cartItems: any = JSON.parse(localStorage.getItem('cartItems') || '""');
    if (cartItems) {
      dispatch(setCartItems(cartItems))
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    getCartTotalPrice()
  }, [cartItems]);
  
  function getCartTotalPrice() {
    let cartTotalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
      cartTotalPrice += (cartItems[i].price * cartItems[i].itemCount)
    }
    dispatch(setCartTotal(cartTotalPrice))
    
    let tmpDiscountVal = cartDiscount.d_val;
    if (cartDiscount.d_code.toString().indexOf('%') > -1) {
      tmpDiscountVal = (cartTotalPrice * cartDiscount.d_var) / 100
    }
    let d_obj = {
      d_code: cartDiscount.d_code,
      d_var: cartDiscount.d_var,
      d_val: tmpDiscountVal
    }
    dispatch(setDiscount(d_obj))
  }
  
  return (
    <main className="content" id="top">
      <Header/>
      <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/" element={<MainPage/>}/>
        <Route path="about" element={<AboutPage/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="catalog" element={<Catalog/>}/>
        <Route path="category/:id" element={<Category/>}/>
        <Route path="checkout" element={<Checkout/>}/>
        <Route path="contacts" element={<Contacts/>}/>
        <Route path="delivery" element={<Delivery/>}/>
        <Route path="success" element={<Thanks/>}/>
        <Route path="policy" element={<Policy/>}/>
        <Route path="terms" element={<Terms/>}/>
        <Route path="product/:id" element={<ProductPage/>}/>
      </Routes>
      <Footer/>
    </main>
  );
}

export default App;
