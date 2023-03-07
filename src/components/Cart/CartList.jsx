import EmptyCart from "../../components/UI/EmptyCart";
import Container from "react-bootstrap/Container";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

import classes from "./CartList.module.css";
import Button from "../../components/UI/Button";
import { useSelector } from "react-redux";
import { Fragment } from "react";

const CartList = () => {
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <p className={classes.notification}>
        Bạn phải đăng nhập để tương tác với giỏ hàng!
      </p>
    );
  }

  let content;
  if (!items || items.length === 0) content = <EmptyCart />;
  else
    content = (
      <ul>
        {items.map((item) => (
          <CartItem item={item} key={item["id_item"]} />
        ))}
      </ul>
    );

  const totalPrice = items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.amount,
    0
  );
  const totalDisplayPrice = Number(totalPrice).toLocaleString("en");

  return (
    <section className="cart-list" style={{ padding: "80px 0" }}>
      <Container fluid="md">
        {content}
        {items.length > 0 && (
          <Fragment>
            <div className={classes["grand-total"]}>
              TỔNG GIÁ: <span>{totalDisplayPrice} VND</span>
            </div>
            <Link
              to="/checkout"
              style={{ width: "250px", display: "block", marginTop: "20px" }}
            >
              <Button>Thanh toán</Button>
            </Link>
          </Fragment>
        )}
      </Container>
    </section>
  );
};

export default CartList;
