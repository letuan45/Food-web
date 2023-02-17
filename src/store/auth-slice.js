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
      const token = action.payload.token;
      const exprirationTime = action.payload.exprirationTime;

      state.token = token;
      state.user = action.payload.user;

      localStorage.setItem("token", token);
      localStorage.setItem("expiredTime", exprirationTime);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.token = "";
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("expiredTime");
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
