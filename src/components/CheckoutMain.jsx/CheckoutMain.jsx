import { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import RadioInput from "../UI/Input/RadioInput";
import CartTable from "./CartTable";
import classes from "./CheckoutMain.module.css";
import TextArea from "../UI/Input/TextArea";
import Button from "../UI/Button";
import BorderedButton from "../UI/Button/BorderedButton";

import { Link } from "react-router-dom";

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

const CheckoutMain = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const descriptionRef = useRef();

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    console.log(paymentMethod);
  };

  const handleSubmitCheckout = (event) => {
    event.preventDefault();
    console.log(paymentMethod, descriptionRef.current.value);
  };

  return (
    <section className="checkout" style={{ padding: "80px 0" }}>
      <Container>
        <i className={classes.notification}>
          Kiểm tra và cung cấp thông tin của bạn
        </i>
        <div className={classes.user}>
          <h1 className={classes.header}>Thông tin người đặt</h1>
          <p className={classes["info-item"]}>
            Họ và tên: <span>Lê Lâm Tuấn</span>
          </p>
          <p className={classes["info-item"]}>
            Địa chỉ: <span>230/14 Man Thiện</span>
          </p>
          <p className={classes["info-item"]}>
            Số điện thoại: <span>0981756860</span>
          </p>
        </div>
        <div>
          <h1 className={classes.header}>Giỏ hàng của bạn</h1>
          <CartTable cartItems={DUMMY_FOODS} />
        </div>
        <form onSubmit={handleSubmitCheckout}>
          <div>
            <h1 className={classes.header}>Thông tin đơn hàng</h1>
            <h3 className={classes["inner-header"]}>Phương thức thanh toán</h3>
            <RadioInput
              label="COD (thanh toán khi nhận hàng)"
              value="cod"
              onChange={handlePaymentChange}
              name="payment"
              defaultChecked
            />
            <RadioInput
              label="Thanh toán ví điện tử"
              value="e-bank"
              name="payment"
              onChange={handlePaymentChange}
            />
            <RadioInput
              label="Thanh toán bằng thẻ ghi nợ"
              value="credit"
              name="payment"
              onChange={handlePaymentChange}
            />
          </div>
          <div>
            <h3 className={classes["inner-header"]}>Ghi chú cho chúng tôi</h3>
            <TextArea ref={descriptionRef} />
          </div>
          <div className={classes["button-group"]}>
            <Button type="submit">Đặt hàng</Button>
            <Link to="/cart">
              <BorderedButton>Kiểm tra giỏ hàng</BorderedButton>
            </Link>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default CheckoutMain;
