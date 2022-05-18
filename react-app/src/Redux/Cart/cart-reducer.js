import * as actionTypes from './cart-types';

const cartReducer = (state=[],action) =>{
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return [...state, action.payload];
        // case actionTypes.REMOVE_FROM_CART:
        //     return{}
        // case actionTypes.ADJUST_QTY:
        //     return{}
        // case actionTypes.LOAD_CURRENT_ITEM:
        //     return{}
        default:
            return state;
    }
}

export default cartReducer