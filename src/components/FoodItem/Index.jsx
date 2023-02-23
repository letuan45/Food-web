import WishButton from "../UI/Button/WishButton";
import { Link } from "react-router-dom";
import classes from "./Index.module.css";

//icons
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RatingStars from "../UI/RatingStars/Index";
//import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

//hooks
import { useDispatch, useSelector } from "react-redux";
import { toastAction, cartActions} from "../../store";

const Index = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { item, className } = props;
  const itemId = item["id_item"];
  const price = Number(item.price).toLocaleString("en");
  const link = `/items/detail/${itemId}`;

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
    dispatch(cartActions(item));
  };

  return (
    <li className={className} style={{ padding: "12px" }}>
      <div className={classes.item}>
        <Link to={link} className={classes["image-link"]}>
          <div className={classes.image}>
            <img src={item.image} alt={`product ${item.name}`} />
          </div>
        </Link>
        <div className={classes.wish}>
          <WishButton item={item} isLiked={item.isLiked}/>
        </div>
        <div className={classes.caption}>
          <div className={classes.rating}>
            <RatingStars rating={item.rating} />
          </div>
          <Link to={link} className={classes.name}>
            {item.name}
          </Link>
          <p className={classes.description}>{item.description}</p>
          <div className="d-flex align-items-center justify-content-between">
            <span className={classes.price}>{price} VND</span>
            <Link
              to={`add-to-cart/${itemId}`}
              className={classes["to-cart-btn"]}
              onClick={addToCartHandler}
            >
              {/* <div className={classes["loading-wrapper"]}>
                <LoadingSpinner />
              </div> */}
              <ShoppingBasketIcon></ShoppingBasketIcon>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Index;
