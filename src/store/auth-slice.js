import { createSlice } from "@reduxjs/toolkit";

//lưu token và thông tin user
const innitialAuth = {
  token: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: innitialAuth,
  reducers: {
    login(state, action) {
      //Lưu token và user vào localStorage
      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout(state) {
      //Xóa token và user khỏi localStorage
      state.token = "";
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    //UX
    applyData(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export default authSlice;
