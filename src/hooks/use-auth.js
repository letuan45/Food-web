import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { authActions } from "../store";

let logoutTimer;

//input: time, output: remainingTime
const calculateRemainingTime = (exprirationTime) => {
  const currentTime = new Date().getTime();
  const adjExprirationTime = new Date(exprirationTime).getTime();
  const remainingTime = adjExprirationTime - currentTime;

  return remainingTime;
};

//Lấy token và expiredTime từ localStorage
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const expiredTime = localStorage.getItem("expiredTime");
  const userStored = JSON.parse(localStorage.getItem("user"));
  const remainingTime = calculateRemainingTime(expiredTime);

  if (remainingTime < 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiredTime");
    localStorage.removeItem("user");
    return null;
  }

  return {
    token: storedToken,
    remainingTime: remainingTime,
    user: userStored,
  };
};

const useAuth = () => {
  const dispatch = useDispatch();

  //Hàm logout
  const logoutHandler = useCallback(() => {
    dispatch(authActions.logout());

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, [dispatch]);

  const loginHandler = useCallback((token, exprirationTime, user) => {
    const payload = { token, exprirationTime, user };
    dispatch(authActions.login(payload));

    //Tính khoảng thời gian còn lại để từ khi login
    const remainingTime = calculateRemainingTime(exprirationTime);

    //Một timeout tự động gọi logout 
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  }, [dispatch, logoutHandler]);

  //Khi refresh và nhận token
  useEffect(() => {
    const tokenRetrived = retrieveStoredToken();
    if (tokenRetrived) {
      //Lưu lại auth redux state
      dispatch(
        authActions.applyData({
          token: tokenRetrived.token,
          user: tokenRetrived.user,
        })
      );
      //Cập nhật timer
      logoutTimer = setTimeout(logoutHandler, tokenRetrived.remainingTime);
    }
  }, [logoutHandler, dispatch]);

  return {
    loginHandler,
    logoutHandler,
  };
};

export default useAuth;
