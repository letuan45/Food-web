import classes from "./index.module.css";
import SideCartList from "./SideCartList";

import Button from "../../Button/index"
import { NavLink } from "react-router-dom";
import ReactDOM from "react-dom";
import { Fragment } from "react";
import BorderedButton from "../../Button/BorderedButton";

const DUMMY_CART = [
  {
    id: 1,
    name: "Tên món ăn",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/29-1-600x600.png",
    price: 20000,
    quantity: 1,
  },
  {
    id: 2,
    name: "Tên món ăn",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/29-1-600x600.png",
    price: 20000,
    quantity: 1,
  },
  {
    id: 3,
    name: "Tên món ăn",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/29-1-600x600.png",
    price: 20000,
    quantity: 1,
  },
  {
    id: 4,
    name: "Tên món ăn",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/29-1-600x600.png",
    price: 20000,
    quantity: 1,
  },
  {
    id: 5,
    name: "Tên món ăn",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/29-1-600x600.png",
    price: 20000,
    quantity: 1,
  },
  {
    id: 6,
    name: "Tên món ăn",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/29-1-600x600.png",
    price: 20000,
    quantity: 1,
  },
];

//const DUMMY_CART = [];

const index = (props) => {
  const classesName = `${classes[`${props.className}`]} ${classes.wrapper}`;
  const totalPrice = Number(3000000).toLocaleString("en");

  return (
    <Fragment>
      {ReactDOM.createPortal(
        (<div className={classesName}>
          <header className={classes.header}>
            <h2>GIỎ HÀNG (5)</h2>
            <button onClick={props.onClose}>Đóng</button>
          </header>
          <div className={classes["body-wrapper"]}>
            <SideCartList cartItems={DUMMY_CART} />
            {DUMMY_CART.length > 0 && (
              <div className={classes.footer}>
                <div className={classes.total}>
                  <div>TỔNG GIÁ:</div>
                  <div>{totalPrice} Đ</div>
                </div>
                <div className={classes["button-group"]}>
                  <NavLink to="/check-out">
                    <Button>Thanh toán</Button>
                  </NavLink>
                  <NavLink to="/cart">
                    <BorderedButton>Chi tiết</BorderedButton>
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>), document.getElementById('overlay-root'))}
    </Fragment>
  );
};

export default index;
