import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useLocation } from "react-router";

import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import classes from "./MobileMenu.module.css";

const Element = (props) => {
  const location = useLocation();
  const { onClose, isOpen } = props;
  const wrapperClasses = `${isOpen ? classes.open : ""} ${
    classes.wrapper
  }`;

  useEffect(() => {
    if (isOpen) {
      return () => {
        onClose();
      };
    }
  }, [location, onClose, isOpen]);

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
            to="/shop"
            className={(props) => (props.isActive ? classes.active : "")}
          >
            Thực đơn
          </NavLink>
        </li>
        <li className={classes["menu-item"]}>
          <NavLink
            to="/check-out"
            className={(props) => (props.isActive ? classes.active : "")}
          >
            Thanh toán
          </NavLink>
        </li>
        <li className={classes["menu-item"]}>
          <NavLink
            to="/book-table"
            className={(props) => (props.isActive ? classes.active : "")}
          >
            Đặt bàn
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
        <li className={classes["menu-item"]}>
          <button className={classes["login-btn"]} onClick={props.openAuth}>
            Đăng nhập
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
            <span>(5)</span>
          </NavLink>
        </li>
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
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default MobileMenu;
