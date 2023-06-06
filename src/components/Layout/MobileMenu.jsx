import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/use-auth";

import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import classes from "./MobileMenu.module.css";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import httpClient from "../../utils/axiosInstance";
import { toastAction } from "../../store";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const Element = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.items);
  const cartLength = cart ? cart.length : 0;
  const { onClose, isOpen } = props;
  const wrapperClasses = `${isOpen ? classes.open : ""} ${classes.wrapper}`;
  const {
    response: logoutResponse,
    isLoading: logoutIsLoading,
    error: logoutError,
    axiosFetch: logoutAction,
  } = useAxiosFunction();
  const logoutURL = "/account/logout";
  const { logoutHandler } = useAuth();

  useEffect(() => {
    if (isOpen) {
      return () => {
        onClose();
      };
    }
  }, [location, onClose, isOpen]);

  const handleLogout = () => {
    //Gọi API đăng xuất
    logoutAction({
      axiosInstance: httpClient,
      method: "GET",
      url: logoutURL,
    });

    //Cập nhật redux State
    logoutHandler();
  };

  useEffect(() => {
    if (logoutResponse) {
      dispatch(
        toastAction.showToast({
          message: logoutResponse.message,
          type: "success",
        })
      );
      onClose();
    }
    if (logoutError) {
      dispatch(
        toastAction.showToast({
          message: logoutError.data.message,
          type: "error",
        })
      );
    }
  }, [logoutResponse, logoutError, dispatch, onClose]);

  let authenticatedSection;
  if (user) {
    authenticatedSection = (
      <Fragment>
        <li className={classes["user-info"]}>
          <h5>Thông tin của bạn</h5>
          <p>
            Họ và tên: <span>{user.name}</span>
          </p>
          <p>
            Email: <span>{user.email}</span>
          </p>
          <p>
            SĐT: <span>{user.phone}</span>
          </p>
          <p>
            Địa chỉ: <span>{user.address}</span>
          </p>
          <button
            className={classes["login-btn"]}
            onClick={() => {
              props.onOpenChangePass();
              onClose();
            }}
            style={{ marginTop: "10px", height: "50px" }}
          >
            Đổi mật khẩu
          </button>
          <button
            className={classes["login-btn"]}
            onClick={handleLogout}
            style={{ marginTop: "10px", height: "50px" }}
          >
            {logoutIsLoading ? <LoadingSpinner /> : "Đăng xuất"}
          </button>
        </li>
        <li className={classes["menu-item"]}>
          <NavLink
            to="wish-list"
            className={(props) => (props.isActive ? classes.active : "")}
          >
            <FavoriteIcon className={classes.icon} />
            Yêu thích
            <span>(10)</span>
          </NavLink>
        </li>
        <li className={classes["menu-item"]}>
          <NavLink
            to="cart"
            className={(props) => (props.isActive ? classes.active : "")}
          >
            <ShoppingBasketIcon className={classes.icon} />
            Giỏ hàng
            <span>{user ? `(${cartLength})` : "X"}</span>
          </NavLink>
        </li>
      </Fragment>
    );
  }

  return (
    <div className={wrapperClasses}>
      <div className={classes.header}>
        <button onClick={onClose} className={classes.close}>
          <CloseIcon />
        </button>
      </div>
      <ul className={classes["menu-list"]}>
        <li className={classes["menu-item"]}>
          <NavLink
            to="/"
            className={(props) => (props.isActive ? classes.active : "")}
          >
            Trang chủ
          </NavLink>
        </li>
        <li className={classes["menu-item"]}>
          <NavLink
            to="/items"
            className={(props) => (props.isActive ? classes.active : "")}
          >
            Thực đơn
          </NavLink>
        </li>
        <li className={classes["menu-item"]}>
          <NavLink
            to="/checkout"
            className={(props) => (props.isActive ? classes.active : "")}
          >
            Thanh toán
          </NavLink>
        </li>
        <li className={classes["menu-item"]}>
          <NavLink
            to="/orders"
            className={(props) => (props.isActive ? classes.active : "")}
          >
            Hóa đơn
          </NavLink>
        </li>
        <li className={classes["menu-item"]}>
          <NavLink
            to="/contact"
            className={(props) => (props.isActive ? classes.active : "")}
          >
            Liên lạc
          </NavLink>
        </li>
      </ul>
      <ul className={classes["fn-list"]}>
        {!user && (
          <li className={classes["menu-item"]}>
            <button className={classes["login-btn"]} onClick={props.openAuth}>
              Đăng nhập
            </button>
          </li>
        )}
        {authenticatedSection}
      </ul>
    </div>
  );
};

const MobileMenu = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Element
          onClose={props.onClose}
          isOpen={props.isOpen}
          openAuth={props.openAuth}
          onOpenChangePass={props.onOpenChangePass}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default MobileMenu;
