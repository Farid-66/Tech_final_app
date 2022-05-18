import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, {payload}) => {
      let findedIndex = state.findIndex((product) => product.id === payload.id);
      if(findedIndex === -1){
        state.push({
          ...payload,
          qty:1
        });
      }else{
        state=state.map((product, index) => {
          return index === findedIndex
            ? { ...product, qty: product.qty + 1 }
            : product;
        });
      }
      
    },
    removeFromCart: (state, payload) => {
      state = state.filter((product) => product.id !== payload.id);
    },
  },
});

export const {addToCart} = cartSlice.actions
export default cartSlice.reducer



