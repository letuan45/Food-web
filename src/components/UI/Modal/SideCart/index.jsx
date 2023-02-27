import classes from "./index.module.css";
import SideCartList from "./SideCartList/SideCartList";

import Button from "../../Button/index";
import { NavLink } from "react-router-dom";
import ReactDOM from "react-dom";
import { Fragment } from "react";
import BorderedButton from "../../Button/BorderedButton";
import { useSelector } from "react-redux";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";

const Index = (props) => {
  const classesName = `${classes[`${props.className}`]} ${classes.wrapper}`;
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const cartLength = cart ? cart.length : 0;
  const totalPrice = cart ? cart.reduce(
    (totalPrice, item) => totalPrice + item.price * item.amount,
    0
  ) : 0;
  const totalPriceString = Number(totalPrice).toLocaleString("en");

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classesName}>
          <header className={classes.header}>
            <h2>GIỎ HÀNG ({cartLength > 0 ? cartLength : "X"})</h2>
            <button onClick={props.onClose}>Đóng</button>
          </header>
          <div className={classes["body-wrapper"]}>
            {user && <SideCartList cartItems={cart} />}
            {!user && (
              <p className={classes["not-auth"]}>
                <NoAccountsIcon />
                Hãy đăng nhập để tương tác với giỏ hàng.
              </p>
            )}
            {cartLength > 0 && user && (
              <div className={classes.footer}>
                <div className={classes.total}>
                  <div>TỔNG GIÁ:</div>
                  <div>{totalPriceString} Đ</div>
                </div>
                <div className={classes["button-group"]}>
                  <NavLink to="/checkout">
                    <Button>Thanh toán</Button>
                  </NavLink>
                  <NavLink to="/cart">
                    <BorderedButton>Chi tiết</BorderedButton>
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Index;
