import { createSlice } from "@reduxjs/toolkit";

const innitState = {
  items: [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState: innitState,
  reducers: {
    replaceWishList(state, action) {
      state.items = action.payload.items;
    },

    toggleWishListItem(state, action) {
      const wishList = state.items;
      const productId = action.payload.item['id_item'];

      const indexItemFound = wishList.findIndex(
        (item) => item["id_item"] === productId
      );
      if (indexItemFound >= 0) {
        wishList.splice(indexItemFound, 1);
      } else {
        wishList.push(action.payload.item);
      }
    },

    clearWishList(state) {
      state.items = [];
    },
  },
});

export default wishListSlice;
