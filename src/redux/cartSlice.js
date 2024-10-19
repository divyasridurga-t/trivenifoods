import { createSlice } from "@reduxjs/toolkit";

const createCartSlice = createSlice({
  name: "cart",
  initialState: {
    item: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.item.push(action.payload);
    },
    removeItem:(state, action)=>{
        let index= state.item.indexOf(action.payload);
        state.item.splice(index,1)
    },
    clearCart:(state)=>{
        state.item.length=0
    }
  },
});

export const { addItem, removeItem, clearCart } = createCartSlice.actions;

export default createCartSlice.reducer;
