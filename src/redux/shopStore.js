import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const shopStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default shopStore;
