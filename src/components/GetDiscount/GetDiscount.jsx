import InputWithButton from "../UI/Input/InputWithButton";
import classes from "./GetDiscount.module.css";

import vegetables from "../../assets/images/parallax_decors/h_vegetables.png";
import piecePizza from "../../assets/images/parallax_decors/h_piece_pizza.png";

const GetDiscount = () => {
  return (
    <section className="get-discount">
      <div className={classes.wrapper}>
        <img src={vegetables} alt="rau củ" />
        <div className={classes.headers}>
          <h3>Quà tặng</h3>
          <h2>
            Nhận <span>10%</span> giảm giá đơn hàng của bạn
          </h2>
          <p>
            Nhập email của bạn để nhận ngay voucher lần đầu giảm 10% giá trị đơn
            hàng tiếp theo
          </p>
          <div className={classes["input-wrapper"]}>
            <InputWithButton
              label="email"
              type="email"
              placeholder="Nhập email của bạn..."
            />
          </div>
          <img src={piecePizza} alt="miếng pizza" />
        </div>
      </div>
    </section>
  );
};

export default GetDiscount;
