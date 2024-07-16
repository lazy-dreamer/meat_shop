import React from "react";
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


function App() {
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
