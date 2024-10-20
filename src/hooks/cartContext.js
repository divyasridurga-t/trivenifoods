import { createContext, useContext, useState } from "react";

let cartContext = createContext();

let cartContextProvider = ({ children }) => {
  let [cartData, setCartData] = useState([]);

  return (
    <cartContext.Provider value={{ cartData, setCartData }}>
      {children}
    </cartContext.Provider>
  );
};

export default cartContextProvider;

export let createCartContext = () => {
  useContext(createContext);
};
