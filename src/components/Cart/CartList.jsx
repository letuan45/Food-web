import EmptyCart from "../../components/UI/EmptyCart";
import Container from "react-bootstrap/Container";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

import classes from "./CartList.module.css";
import Button from "../../components/UI/Button";

const DUMMY_FOODS = [
  {
    id: 1,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    name: "Tên món ăn Tên món ăn Tên món ăn",
    price: "60000",
    quantity: 1,
  },
  {
    id: 2,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    name: "Tên món ăn",
    price: "60000",
    quantity: 2,
  },
  {
    id: 3,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    name: "Tên món ăn",
    price: "60000",
    quantity: 3,
  },
  {
    id: 4,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    name: "Tên món ăn",
    price: "60000",
    quantity: 1,
  },
];

const CartList = () => {
  const items = DUMMY_FOODS;

  let content;
  if (!items || items.length === 0) content = <EmptyCart />;

  content = (
    <ul>
      {items.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
    </ul>
  );

  return (
    <section className="cart-list" style={{ padding: "80px 0" }}>
      <Container fluid="md">
        {content}
        <div className={classes["grand-total"]}>
          TỔNG GIÁ: <span>300,000 VND</span>
        </div>
        <Link
          to="/checkout"
          style={{ width: "250px", display: "block", marginTop: "20px" }}
        >
          <Button>Thanh toán</Button>
        </Link>
      </Container>
    </section>
  );
};

export default CartList;
