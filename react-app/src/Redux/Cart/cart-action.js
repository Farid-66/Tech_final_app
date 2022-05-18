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

// export const removeFromCart = (itemID) => {
//     return {
//         type: actionTypes.REMOVE_FROM_CART,
//         payload: {
//             id: itemID
//         }
//     }
// }

// export const adjustQty = (itemID, val) => {
//     return {
//         type: actionTypes.ADJUST_QTY,
//         payload: {
//             id: itemID,
//             qty: val
//         }
//     }
// }

// export const loadCurrentItem = (item) => {
//     return {
//         type: actionTypes.LOAD_CURRENT_ITEM,
//         payload: item
//     }
// }