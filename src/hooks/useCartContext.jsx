import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const loadLocalStorage = () => {
    try {
      let storedData = localStorage.getItem("cart");
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.log(`error occured : `, error);
      return [];
    }
  };

  let [cartData, setCartData] = useState(loadLocalStorage);

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cartData))
  },[cartData])

  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
