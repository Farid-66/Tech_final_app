// import { configureStore } from "@reduxjs/toolkit";
// import cartSlice from "./Cart/cart-slice";

// export const store = configureStore({
//     reducer:{
//         cartSlice,
//     },
// });

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart/cart-slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});