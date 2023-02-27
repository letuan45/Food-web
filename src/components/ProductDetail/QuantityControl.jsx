import classes from "./QuantityControl.module.css";
import { Fragment, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Button from "../../components/UI/Button";

import { useSelector, useDispatch } from "react-redux";
import { toastAction, cartActions } from "../../store";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import httpClient from "../../utils/axiosInstance";

const QuantityControl = (props) => {
  const [amount, setAmount] = useState(1);
  const { product } = props;
  const { maxQuantity } = props;
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const addToCartURL = `/cart/add/${product["id_item"]}`;
  const {
    response: addToCartResponse,
    error: addToCartError,
    axiosFetch: addToCart,
  } = useAxiosFunction();

  const increaseQuantityHandler = (event) => {
    event.preventDefault();

    setAmount((state) => state + 1);
  };

  const decreaseQuantityHandler = (event) => {
    event.preventDefault();

    if (amount - 1 <= 0) return;
    setAmount((state) => state - 1);
  };

  const handleQuantityChange = (event) => {
    const value = +event.target.value;
    if (value <= 0 || isNaN(value) || value > maxQuantity) {
      setAmount(1);
      return;
    }
    setAmount(value);
  };

  const addToCartHandler = () => {
    if (!user) {
      dispatch(
        toastAction.showToast({
          message: "Bạn phải đăng nhập để tương tác với giỏ hàng",
          type: "warning",
        })
      );
      return;
    }
    addToCart({
      axiosInstance: httpClient,
      method: "POST",
      url: addToCartURL,
      requestConfig: {
        data: { quantity: amount },
      },
    });
  };

  useEffect(() => {
    if (addToCartResponse) {
      dispatch(cartActions.addTocart({ ...product, amount: amount }));
      dispatch(
        toastAction.showToast({
          message: addToCartResponse.message,
          type: "success",
        })
      );
      return;
    }
    if(addToCartError) {
      console.log(addToCartError);
      dispatch(
        toastAction.showToast({
          message: addToCartError.data.message,
          type: "error",
        })
      );
    }
    /* eslint-disable-next-line */
  }, [addToCartError, addToCartResponse, dispatch]);

  return (
    <Fragment>
      <div className={classes["quantity-control"]}>
        <button onClick={decreaseQuantityHandler}>
          <RemoveIcon />
        </button>
        <input value={amount} onChange={handleQuantityChange} />
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
