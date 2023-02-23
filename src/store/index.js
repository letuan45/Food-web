import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import toastSlice from "./toast-slice";
import cartSlice from "./cart-slice";
import wishListSlice from "./wish-list-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    toast: toastSlice.reducer,
    cart: cartSlice.reducer,
    wishList: wishListSlice.reducer
  },
});

export default store;

export const toastAction = toastSlice.actions;
export const authActions = authSlice.actions;
export const cartActions = cartSlice.actions;
export const wishListActions = wishListSlice.actions;