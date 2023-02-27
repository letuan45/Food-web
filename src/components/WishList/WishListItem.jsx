import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import BorderedButton from "../../components/UI/Button/BorderedButton";
import classes from "./WishList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { wishListActions, toastAction } from "../../store";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import httpClient from "../../utils/axiosInstance";
import { cartActions } from "../../store";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const WishListItem = (props) => {
  const { item } = props;
  const wishListURL = `/wishlist/${item["id_item"]}`;
  const itemURL = `/items/detail/${item["id_item"]}`;
  const { response, error, axiosFetch } = useAxiosFunction();
  const dispatch = useDispatch();
  const addToCartURL = `/cart/add/${item["id_item"]}`;
  const user = useSelector((state) => state.auth.user);

  const {
    response: addToCartResponse,
    error: addToCartError,
    axiosFetch: addToCart,
    loading: isLoadingAddToCart,
  } = useAxiosFunction();

  const handleRemoveItem = (event) => {
    event.preventDefault();
    if (!user) {
      dispatch(
        toastAction.showToast({
          message: "Hãy đăng nhập để tương tác với giỏ hàng!",
          type: "warning",
        })
      );
      return;
    }
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: wishListURL,
    });
  };

  const addToCartHandler = (event) => {
    event.preventDefault();
    if (!user) {
      dispatch(
        toastAction.showToast({
          message: "Hãy đăng nhập để tương tác với giỏ hàng!",
          type: "warning",
        })
      );
      return;
    }
    addToCart({
      axiosInstance: httpClient,
      method: "POST",
      url: addToCartURL,
    });
  };

  useEffect(() => {
    if (response) {
      dispatch(
        toastAction.showToast({
          message: response.message,
          type: "success",
        })
      );
      dispatch(wishListActions.toggleWishListItem({ item: item }));
    }
    if (error) {
      dispatch(
        toastAction.showToast({
          message: response.data.message,
          type: "error",
        })
      );
    }
    /* eslint-disable-next-line */
  }, [response, error, dispatch]);

  useEffect(() => {
    if (addToCartResponse) {
      dispatch(cartActions.addTocart({ ...item, amount: 1 }));
      dispatch(
        toastAction.showToast({
          message: addToCartResponse.message,
          type: "success",
        })
      );
      return;
    }
    if (addToCartError) {
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
    <tr>
      <td className={classes["column-image"]}>
        <Link to={itemURL} className={classes["product-image"]}>
          <img src={item.image} alt="hinh anh san pham" />
        </Link>
      </td>
      <td className={classes["column-des"]}>
        <div>
          <Link className={classes["name-item"]} to={itemURL}>
            {item.name}
          </Link>
        </div>
        <div>Giá: {Number(item.price).toLocaleString("en")} VND</div>
      </td>
      <td className={classes["btn-group"]}>
        <Link
          to={`${addToCartURL}`}
          onClick={addToCartHandler}
          className={`${classes["to-cart-btn"]} ${
            isLoadingAddToCart ? classes.loading : ""
          }`}
        >
          <Button>
            {isLoadingAddToCart && <LoadingSpinner />}
            {!isLoadingAddToCart && "Thêm vào giỏ hàng"}
          </Button>
        </Link>
        <Link to={wishListURL} onClick={handleRemoveItem}>
          <BorderedButton>Xóa khỏi yêu thích</BorderedButton>
        </Link>
      </td>
    </tr>
  );
};

export default WishListItem;
