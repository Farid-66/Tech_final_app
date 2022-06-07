import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart/cart-slice";
import favouriteReducer from "./Favourite/favourite-slice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourite: favouriteReducer,
  },
});