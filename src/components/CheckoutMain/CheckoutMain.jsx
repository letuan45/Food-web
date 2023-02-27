import { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import RadioInput from "../UI/Input/RadioInput";
import CartTable from "./CartTable";
import classes from "./CheckoutMain.module.css";
import TextArea from "../UI/Input/TextArea";
import Button from "../UI/Button";
import BorderedButton from "../UI/Button/BorderedButton";

import { Link } from "react-router-dom";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useSelector } from "react-redux";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import httpClient from "../../utils/axiosInstance";
import useAxios from "../../hooks/useAxios";

const CheckoutMain = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [paymentList, setPaymentList] = useState([])
  const descriptionRef = useRef();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const getPaymentMethodURL = "/payment_methods";

  const {response: paymentsResponse} = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getPaymentMethodURL
  });

  useEffect(() => {
    console.log(paymentsResponse);
    setPaymentList(paymentsResponse);
  },[paymentsResponse]);

  if (!user) {
    return (
      <p className={classes.notify}>
        <PersonPinIcon />
        Hãy đăng nhập để thanh toán giỏ hàng của bạn!
      </p>
    );
  }

  if (cartItems.length === 0) {
    return (
      <p className={classes.notify}>
        <RemoveShoppingCartIcon />
        Giỏ hàng của bạn đang trống!
      </p>
    );
  }

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
            Họ và tên: <span>{user.name}</span>
          </p>
          <p className={classes["info-item"]}>
            Địa chỉ: <span>{user.address}</span>
          </p>
          <p className={classes["info-item"]}>
            Số điện thoại: <span>{user.phone}</span>
          </p>
        </div>
        <div>
          <h1 className={classes.header}>Giỏ hàng của bạn</h1>
          <CartTable cartItems={cartItems} />
        </div>
        <form onSubmit={handleSubmitCheckout}>
          <div className={classes["payment-wrapper"]}>
            <h1 className={classes.header}>Thông tin đơn hàng</h1>
            <h3 className={classes["inner-header"]}>Phương thức thanh toán</h3>
            {paymentList && paymentList.map((item, index) => (
              <RadioInput
                key={index}
                label={item.name}
                value={item["id_payment"]}
                onChange={handlePaymentChange}
                name="payment"
                defaultChecked
              />
            ))}

            {/* <RadioInput
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
            /> */}
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
