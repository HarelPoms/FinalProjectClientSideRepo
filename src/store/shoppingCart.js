import { createSlice } from "@reduxjs/toolkit";

const initialState = {shoppingCart: []};

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        insertItemToCart(state, itemToInsert) {
            const isItemInCart = state.shoppingCart.find((item) => item._id === itemToInsert.payload._id);
            if(isItemInCart){
                state.shoppingCart = state.shoppingCart.map((item) => item._id === itemToInsert.payload._id ? { ...item, amount: item.amount + 1} : item );
            }
            else{
                state.shoppingCart = [...state.shoppingCart, {_id: itemToInsert.payload._id, name: itemToInsert.payload.name, image: itemToInsert.payload.image, price: itemToInsert.payload.price, amount: 1}];
            }
        },
        removeItemFromCart(state, itemToRemove) {
            const isItemInCart = state.shoppingCart.find((item) => item._id === itemToRemove.payload._id);
            if(isItemInCart && isItemInCart.amount > 1){
                state.shoppingCart = state.shoppingCart.map((item) => item._id === itemToRemove.payload._id ? { ...item, amount: item.amount - 1} : item )
            }
            else if(isItemInCart){
                state.shoppingCart = state.shoppingCart.filter((item) => item._id != itemToRemove.payload._id );
            }
        },
        clearCart(state){
            state.shoppingCart = [];
        },
        manualItemQuantityChangeInCart(state, itemToModify) {
            state.shoppingCart.map((item) => item._id === itemToModify._id ? { ...item, amount: item.amount + itemToModify.amount} : item );
        }
    },
});

export const shoppingCartActions = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
