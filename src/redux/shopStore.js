import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const loadState = () => {
  try {
    let local_data = localStorage.getItem("cart");
    if (!local_data) {
      return undefined;
    }
    return JSON.parse(local_data);
  } catch (error) {
    console.log("failed to get the data from localStorage : ", error);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    let local_data = JSON.stringify(state);
    localStorage.setItem("cart", local_data)
  } catch (error) {
    console.log("failed to get the data from localStorage : ", error);
  }
};

const shopStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadState(),
});


shopStore.subscribe(()=>{
  saveState(shopStore.getState().cart)
})

export default shopStore;
