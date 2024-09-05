import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {MainPage} from "../pages/MainPage";
import {AboutPage} from "../pages/AboutPage"
import {NotFoundPage} from "../pages/NotFoundPage"
import {CartPage} from "../pages/CartPage"
import {CatalogPage} from "../pages/CatalogPage"
import {CategoryPage} from "../pages/CategoryPage"
import {CheckoutPage} from "../pages/CheckoutPage"
import {ContactsPage} from "../pages/ContactsPage"
import {DeliveryPage} from "../pages/DeliveryPage"
import {ThanksPage} from "../pages/ThanksPage"
import {Header} from "./Header";
import {Footer} from "./Footer";
import {PolicyPage} from "../pages/PolicyPage";
import {TermsPage} from "../pages/TermsPage";
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
        <Route path="*" element={<NotFoundPage/>}/>
        <Route path="/" element={<MainPage/>}/>
        <Route path="about" element={<AboutPage/>}/>
        <Route path="cart" element={<CartPage/>}/>
        <Route path="catalog" element={<CatalogPage/>}/>
        <Route path="category/:id" element={<CategoryPage/>}/>
        <Route path="checkout" element={<CheckoutPage/>}/>
        <Route path="contacts" element={<ContactsPage/>}/>
        <Route path="delivery" element={<DeliveryPage/>}/>
        <Route path="success" element={<ThanksPage/>}/>
        <Route path="policy" element={<PolicyPage/>}/>
        <Route path="terms" element={<TermsPage/>}/>
        <Route path="product/:id" element={<ProductPage/>}/>
      </Routes>
      <Footer/>
    </main>
  );
}

export default App;
