import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from './Cart/cart-reducer'

const Reducer = combineReducers({
    cartReducer,
});

export default Reducer