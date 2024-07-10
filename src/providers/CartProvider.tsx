import {createContext, useEffect, useState} from "react";
import {ProductService} from "../services/product.service";

export const CartContext = createContext();

const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await ProductService.getAll().then(function(result) {
        setProducts(result)
      });
    }
    fetchData()
  }, []);
  
  return (
    <CartContext.Provider value={{cartItems, setCartItems, products}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;