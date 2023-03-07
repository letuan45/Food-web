import Container from "react-bootstrap/Container";
import classes from "./CheckoutSuccess.module.css";
import pizzaSticker from "../../assets/images/pizza_sticker.png";
import FillingButton from "../UI/Button/FillingButton";

import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <section className="checkout-success" style={{ padding: "80px 0" }}>
      <Container>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className={classes["img-box"]}>
            <img src={pizzaSticker} alt="pizza" />
          </div>
          <h1 className={classes["thanks"]}>
            Cảm ơn bạn đã ủng hộ POCO! <br />
            Đơn hàng của bạn đang được xử lý
          </h1>
          <Link to="/" style={{marginTop: "30px"}}>
            <FillingButton>Quay về trang chủ</FillingButton>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutSuccess;
