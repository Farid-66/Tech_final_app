import * as actionTypes from './favourite-types'

export const addToCart = (item) => {
    return {
        type: actionTypes.ADD_TO_FAVOURITE,
        payload: {
            item: item
        }
    }
}