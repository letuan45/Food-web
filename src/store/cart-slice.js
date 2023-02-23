import { createSlice } from "@reduxjs/toolkit";

const innitialCart = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: innitialCart,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
    },

    //Thêm giỏ hàng, nếu sp có trong giỏ, tăng SL lên 1
    addTocart(state, action) {
      const cartItems = state.items;
      const itemFounded = cartItems
        .filter((item) => item["id_item"] === action.payload["id_item"])
        .pop();

      if (itemFounded) {
        itemFounded.quantity += action.payload.amount;
      } else {
        cartItems.unshift(action.payload);
      }
    },

    //Xóa toàn bộ item
    removeEntireItem(state, action) {
      const itemId = action.payload.id;
      state.items.filter((item) => item.id !== itemId);
    },

    //Xóa khỏi giỏ, nếu sp còn 1 quantity thì xóa toàn bộ
    removeFromCart(state, action) {
      const cartItems = state.items;
      const itemFounded = cartItems
        .filter((item) => item.id === action.payload.id)
        .pop();

      if (itemFounded) {
        if (action.payload.amount > 1) {
          itemFounded.quantity -= action.payload.quantity;
        } else {
          state.items.filter((item) => item.id !== action.payload.id);
        }
      } else {
        return;
      }
    },

    //Cập nhật quantity item
    updateQuantity(state, action) {
      const cartItems = state.items;
      const itemFounded = cartItems
        .filter((item) => item.id === action.payload.id)
        .pop();

      if (itemFounded) {
        itemFounded.quantity = action.payload.amount;
      } else {
        return;
      }
    },

    //clear toàn bộ giỏ hàng
    clearCart(state) {
      state.items = [];
    },
  },
});

export default cartSlice;
