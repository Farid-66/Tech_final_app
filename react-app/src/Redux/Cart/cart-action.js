import * as actionTypes from './cart-types'

export const addToCart = (itemID,val) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: {
            id: itemID,
            qty: val
        }
    }
}