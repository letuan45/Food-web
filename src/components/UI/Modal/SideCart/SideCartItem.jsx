import { Link } from "react-router-dom";

import classes from "./SideCartItem.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// import useAxiosFunction from  "../../../../hooks/useAxiosFunction";

const SideCartItem = (props) => {
  const { item } = props;
  const removeItemURL = `cart/remove/${item["id_item"]}`;
  const itemLink = `items/detail/${item["id_item"]}`;
  const price = Number(item.price).toLocaleString("en");

  // const handleRemoveItem = (event) => {
  //   event.preventDefault();
  // }

  return (
    <li className={classes.item}>
      <Link to={removeItemURL} className={classes["remove-btn"]}>
        <HighlightOffIcon />
      </Link>
      <div className="w-100">
        <Link className={classes["item-nav"]} to={itemLink}>
          <img src={item.image} alt="hinh san pham"></img>
          <span>{item.name}</span>
        </Link>
        <span className={classes["item-desc"]}>
          {item.quantity} x <p>{price} Đ</p>
        </span>
      </div>
    </li>
  );
};

export default SideCartItem;
