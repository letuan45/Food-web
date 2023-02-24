import { Link } from "react-router-dom";

import classes from "./SideCartItem.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import useAxiosFunction from "../../../../hooks/useAxiosFunction";
import { useSelector, useDispatch } from "react-redux";
import { cartActions, toastAction } from "../../../../store";
import httpClient from "../../../../utils/axiosInstance";
import { useEffect } from "react";

const SideCartItem = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const removeItemURL = `cart/remove/${item["id_item"]}`;
  const itemLink = `items/detail/${item["id_item"]}`;
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
      <Link
        to={removeItemURL}
        className={classes["remove-btn"]}
        onClick={handleRemoveItem}
      >
        <HighlightOffIcon />
      </Link>
      <div className="w-100">
        <Link className={classes["item-nav"]} to={itemLink}>
          <img src={item.image} alt="hinh san pham"></img>
          <span>{item.name}</span>
        </Link>
        <span className={classes["item-desc"]}>
          {item.amount} x <p>{price} Đ</p>
        </span>
      </div>
    </li>
  );
};

export default SideCartItem;
