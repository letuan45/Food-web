import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import classes from "./WishButton.module.css";
//hooks
import { useDispatch, useSelector } from "react-redux";
import { toastAction, wishListActions} from "../../../store";
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import httpClient from "../../../utils/axiosInstance";
import { useEffect } from "react";

const WishButton = (props) => {
  const { item } = props;
  const { id_item: itemId } = item;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const toggleURL = `/wishlist/${itemId}`;

  const { response, error, axiosFetch } = useAxiosFunction();

  const handleOnClick = (event) => {
    event.preventDefault();

    if (!user) {
      dispatch(
        toastAction.showToast({
          message: "Hãy đăng nhập để tương tác với danh mục yêu thích!",
          type: "warning",
        })
      );
      return;
    }
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: toggleURL
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
  },[response, error, dispatch]);

  return (
    <Link
      className={`${classes.btn} ${props.isLiked ? classes.liked : ""}`}
      to={toggleURL}
      onClick={handleOnClick}
    >
      <FavoriteIcon />
    </Link>
  );
};

export default WishButton;
