import { createSlice } from "@reduxjs/toolkit";

const initialState = {shoppingCart: []};

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        insertItemToCart(state, itemToInsert) {
            const isItemInCart = state.shoppingCart.find((item) => item._id === itemToInsert._id);
            if(isItemInCart){
                state.shoppingCart.map((item) => item._id === itemToInsert._id ? { ...item, amount: item.amount + 1} : item )
            }
            else{
                state.shoppingCart = [...state.shoppingCart, {...itemToInsert, amount: 1}];
            }
        },
        removeItemFromCart(state, itemToRemove) {
            const isItemInCart = state.shoppingCart.find((item) => item._id === itemToRemove._id);
            if(isItemInCart && isItemInCart.amount > 1){
                state.shoppingCart.map((item) => item._id === itemToRemove._id ? { ...item, amount: item.amount - 1} : item )
            }
            else{
                state.shoppingCart.filter((item) => item._id != itemToRemove._id );
            }
        },
        manualItemQuantityChangeInCart(state, itemToModify) {
            state.shoppingCart.map((item) => item._id === itemToModify._id ? { ...item, amount: item.amount + itemToModify.amount} : item );
        }
    },
});

export const shoppingCartActions = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
