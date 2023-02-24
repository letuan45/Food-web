import classes from "./CartItem.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import httpClient from "../../utils/axiosInstance";
import { cartActions, toastAction } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const CartItem = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const removeItemURL = `cart/remove/${item["id_item"]}`;
  const subTotal = Number(item.price * item.amount).toLocaleString("en");
  const price = Number(item.price).toLocaleString("en");
  const user = useSelector((state) => state.auth.user);
  const {
    response: removeResponse,
    error: removeError,
    axiosFetch: removeItem,
  } = useAxiosFunction();

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

  return (
    <li className={classes.item}>
      <Link className={classes["item-image"]} to={`/product/${item.id}`}>
        <img src={item.image} alt="hinh anh sp" />
      </Link>
      <div className={classes.desc}>
        <div className={classes["item-desc"]}>
          <Link to={`/product/${item.id}`}>{item.name}</Link>
          <div className={classes.price}>
            Đơn giá: <span>{price} VND</span>
          </div>
          <div className={classes["quantity-control"]}>
            <Link to={`/product/plus/${item.id}`}>
              <AddCircleOutlineIcon />
            </Link>
            <input type="number" defaultValue={item.amount} />
            <Link to={`/product/minus/${item.id}`}>
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
