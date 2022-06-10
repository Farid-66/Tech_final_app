import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        addToFavourite: (state, { payload }) => {
            let findIndex = state.findIndex((product) => product.id === payload.id)
            if (findIndex === -1) {
                state.push({ ...payload });
            } else {
                return [...state.filter((product) => product.id != payload.id)]
            }
        }
    }
})


export const { addToFavourite } = favouriteSlice.actions
export default favouriteSlice.reducer