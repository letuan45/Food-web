import classes from "./QuantityControl.module.css";
import { Fragment, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Button from "../../components/UI/Button";
import { useSelector, useDispatch } from "react-redux";
import { toastAction } from "../../store";

const QuantityControl = (props) => {
  const [quantity, setQuantity] = useState(1);
  const { maxQuantity } = props;
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const increaseQuantityHandler = (event) => {
    event.preventDefault();

    setQuantity((state) => state + 1);
  };

  const decreaseQuantityHandler = (event) => {
    event.preventDefault();

    if (quantity - 1 <= 0) return;
    setQuantity((state) => state - 1);
  };

  const handleQuantityChange = (event) => {
    const value = +event.target.value;
    if (value <= 0 || isNaN(value) || value > maxQuantity) {
      setQuantity(1);
      return;
    }

    setQuantity(value);
  };

  const addToCartHandler = () => {
    if (!user) {
      dispatch(
        toastAction.showToast({
          message: "Bạn phải đăng nhập để tương tác với giỏ hàng",
          type: "warning"
        })
      );
    }
  };

  return (
    <Fragment>
      <div className={classes["quantity-control"]}>
        <button onClick={decreaseQuantityHandler}>
          <RemoveIcon />
        </button>
        <input value={quantity} onChange={handleQuantityChange} />
        <button onClick={increaseQuantityHandler}>
          <AddIcon />
        </button>
      </div>
      <div className={classes["add-to-cart-wrapper"]}>
        <Button onClick={addToCartHandler}>
          <ShoppingBasketIcon
            style={{ marginRight: "8px" }}
            className={classes["icon-add"]}
          ></ShoppingBasketIcon>
          Thêm vào giỏ hàng
        </Button>
      </div>
    </Fragment>
  );
};

export default QuantityControl;
