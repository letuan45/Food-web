import classes from "./CartItem.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import httpClient from "../../../utils/axiosInstance";
import { cartActions, toastAction } from "../../../store";
import { useDispatch, useSelector } from "react-redux";

let debounceFlag = true;

const CartItem = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const removeItemURL = `cart/remove/${item["id_item"]}`;
  const subTotal = Number(item.price * item.amount).toLocaleString("en");
  const price = Number(item.price).toLocaleString("en");
  const user = useSelector((state) => state.auth.user);
  const [amount, setAmount] = useState(item.amount);
  const increaseAmountURL = `/cart/increase/${item["id_item"]}`;
  const decreaseAmountURL = `/cart/decrease/${item["id_item"]}`;
  const updateAmountURL = `/cart/update/${item["id_item"]}`;
  const itemURl = `/items/detail/${item["id_item"]}`;

  const {
    response: removeResponse,
    error: removeError,
    axiosFetch: removeItem,
  } = useAxiosFunction();

  const {
    response: increaseResponse,
    error: increaseError,
    axiosFetch: increaseAmount,
  } = useAxiosFunction();

  const {
    response: decreaseResponse,
    error: decreaseError,
    axiosFetch: decreaseAmount,
  } = useAxiosFunction();

  const {
    response: updateResponse,
    error: updateError,
    axiosFetch: updateAmount,
  } = useAxiosFunction();

  const handleChangeAmount = (event) => {
    const value = +event.target.value;
    debounceFlag = false;
    if (value === 0) {
      setAmount(1);
      return;
    }
    if (value > item.quantity) {
      setAmount(item.quantity);
      return;
    }
    setAmount(value);
  };

  //change amount debounce
  useEffect(() => {
    if (debounceFlag) return;
    console.log(amount);
    const handler = setTimeout(() => {
      updateAmount({
        axiosInstance: httpClient,
        method: "POST",
        url: updateAmountURL,
        requestConfig: {
          data: {
            quantity: amount,
          },
        },
      });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [amount, updateAmountURL, updateAmount]);

  const handleRemoveItem = (event) => {
    event.preventDefault();
    if (!user) {
      dispatch(
        toastAction.showToast({
          message: "Bạn phải đăng nhập để tương tác với giỏ hàng!",
          type: "error",
        })
      );
      return;
    }

    removeItem({
      axiosInstance: httpClient,
      method: "DELETE",
      url: removeItemURL,
    });
  };

  const handleIncreaseAmount = (event) => {
    event.preventDefault();
    if (!user) {
      dispatch(
        toastAction.showToast({
          message: "Bạn phải đăng nhập để tương tác với giỏ hàng!",
          type: "error",
        })
      );
      return;
    }

    increaseAmount({
      axiosInstance: httpClient,
      method: "POST",
      url: increaseAmountURL,
    });
  };

  const handleDecreaseAmount = (event) => {
    event.preventDefault();
    if (!user) {
      dispatch(
        toastAction.showToast({
          message: "Bạn phải đăng nhập để tương tác với giỏ hàng!",
          type: "error",
        })
      );
      return;
    }

    decreaseAmount({
      axiosInstance: httpClient,
      method: "POST",
      url: decreaseAmountURL,
    });
  };

  //Bắt sự kiện
  useEffect(() => {
    if (removeResponse) {
      dispatch(cartActions.removeEntireItem({ id: item["id_item"] }));
      dispatch(
        toastAction.showToast({
          message: removeResponse.message,
          type: "success",
        })
      );
      return;
    }
    if (removeError) {
      dispatch(
        toastAction.showToast({
          message: removeError.data.message,
          type: "error",
        })
      );
    }
    /* eslint-disable-next-line */
  }, [removeResponse, removeError, dispatch]);

  useEffect(() => {
    if (increaseResponse) {
      //Cập nhật trên giao diện
      const amountUpdate = amount;
      dispatch(
        cartActions.updateQuantity({
          id: item["id_item"],
          amount: amountUpdate + 1,
        })
      );
      setAmount((oldAmount) => oldAmount + 1);
      dispatch(
        toastAction.showToast({
          message: increaseResponse.message,
          type: "success",
        })
      );
      return;
    }
    if (increaseError) {
      dispatch(
        toastAction.showToast({
          message: increaseError.data.message,
          type: "error",
        })
      );
    }
    /* eslint-disable-next-line */
  }, [increaseResponse, increaseError, dispatch]);

  useEffect(() => {
    if (decreaseResponse) {
      //Cập nhật trên giao diện
      dispatch(cartActions.removeFromCart({ id: item["id_item"] }));
      if (item.amount > 1) setAmount((oldAmount) => oldAmount - 1);

      dispatch(
        toastAction.showToast({
          message: decreaseResponse.message,
          type: "success",
        })
      );
      return;
    }
    if (decreaseError) {
      dispatch(
        toastAction.showToast({
          message: decreaseError.data.message,
          type: "error",
        })
      );
    }
    /* eslint-disable-next-line */
  }, [decreaseResponse, decreaseError, dispatch]);

  useEffect(() => {
    if (updateResponse) {
      //Cập nhật trên giao diện
      dispatch(
        cartActions.updateQuantity({ id: item["id_item"], amount: amount })
      );
      return;
    }
    if (updateError) {
      dispatch(
        toastAction.showToast({
          message: updateError.data.message,
          type: "error",
        })
      );
    }
    /* eslint-disable-next-line */
  }, [updateResponse, updateError, dispatch]);

  return (
    <li className={classes.item}>
      <Link className={classes["item-image"]} to={itemURl}>
        <img src={item.image} alt="hinh anh sp" />
      </Link>
      <div className={classes.desc}>
        <div className={classes["item-desc"]}>
          <Link to={itemURl}>{item.name}</Link>
          <div className={classes.price}>
            Đơn giá: <span>{price} VND</span>
          </div>
          <div className={classes["quantity-control"]}>
            <Link to={increaseAmountURL} onClick={handleIncreaseAmount}>
              <AddCircleOutlineIcon />
            </Link>
            <input type="number" value={amount} onChange={handleChangeAmount} />
            <Link to={decreaseAmountURL} onClick={handleDecreaseAmount}>
              <RemoveCircleOutlineIcon />
            </Link>
          </div>
          <div className={classes.total}>
            Tổng: <span>{subTotal} VND</span>
          </div>
        </div>
        <Link
          className={classes.remove}
          onClick={handleRemoveItem}
          to={removeItemURL}
        >
          <DeleteIcon />
        </Link>
      </div>
    </li>
  );
};

export default CartItem;
