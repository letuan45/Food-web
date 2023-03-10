import classes from "./FoodItemVertical.module.css";
import { Link } from "react-router-dom";

import RatingStar from "../../components/UI/RatingStars/Index";

const FoodItemVertical = (props) => {
  const { item } = props;
  const { style } = props;
  const price = Number(item.price).toLocaleString("en");
  const link = `/items/detail/${item["id_item"]}`;

  return (
    <li style={style} className={classes.item}>
      <Link to={link} className={classes["image-wrapper"]}>
        <img src={item.image} alt="hình ảnh sp" />
      </Link>
      <div className={classes["product-info"]}>
        <RatingStar rating={item.rating} />
        <Link to={link} className={classes["product-name"]}>
          {item.name}
        </Link>
        <div className={classes.price}>{price} VND</div>
      </div>
    </li>
  );
};

export default FoodItemVertical;
