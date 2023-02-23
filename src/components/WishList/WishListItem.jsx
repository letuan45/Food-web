import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import BorderedButton from "../../components/UI/Button/BorderedButton";
import classes from "./WishList.module.css";
import { useDispatch } from "react-redux";
import { wishListActions, toastAction} from "../../store";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import httpClient from "../../utils/axiosInstance";

const WishListItem = (props) => {
  const { item } = props;
  const wishListURL = `/wishlist/${item["id_item"]}`;
  const itemURL = `/items/detail/${item["id_item"]}`;
  const { response, error, axiosFetch } = useAxiosFunction();
  const dispatch = useDispatch();

  const handleRemoveItem = (event) => {
    event.preventDefault();
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: wishListURL,
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
        <Link to={`/add-to-cart/${item.idProduct}`}>
          <Button>Thêm vào giỏ hàng</Button>
        </Link>
        <Link to={wishListURL} onClick={handleRemoveItem}>
          <BorderedButton>Xóa khỏi yêu thích</BorderedButton>
        </Link>
      </td>
    </tr>
  );
};

export default WishListItem;
