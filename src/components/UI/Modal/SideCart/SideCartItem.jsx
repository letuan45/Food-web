import { NavLink } from "react-router-dom";

import classes from "./SideCartItem.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const SideCartItem = (props) => {
  const { item } = props;
  const removeItemAPI = `remove/${item.id}`;
  const itemLink = `food/${item.id}`;
  const price = Number(item.price).toLocaleString("en");

  return (
    <li className={classes.item}>
      <NavLink to={removeItemAPI} className={classes["remove-btn"]}>
        <HighlightOffIcon />
      </NavLink>
      <div className="w-100">
        <NavLink className={classes["item-nav"]} to={itemLink}>
          <img src={item.image} alt="hinh san pham"></img>
          <span>{item.name}</span>
        </NavLink>
        <span className={classes["item-desc"]}>
          {item.quantity} x <p>{price} Đ</p>
        </span>
      </div>
    </li>
  );
};

export default SideCartItem;
