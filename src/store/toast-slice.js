import { createSlice } from "@reduxjs/toolkit";

const innitialState = {
  isShown: false,
  message: "",
  type: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState: innitialState,
  reducers: {
    showToast(state, action) {
      state.isShown = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },

    closeToast(state) {
      state.isShown = false;
      state.message = "";
      state.type = "";
    },
  },
});

export default toastSlice;
