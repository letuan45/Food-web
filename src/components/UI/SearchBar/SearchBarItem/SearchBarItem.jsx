import { Link } from "react-router-dom";
import classes from "./SearchBarItem.module.css";

const SearchBarItem = (props) => {
  const { item } = props;
  const itemURL = `/items/detail/${item["id_item"]}`;
  const price = Number(item.price).toLocaleString("en");

  return (
    <li className={classes.item}>
      <Link
        to={itemURL}
        className={classes["item-wrapper"]}
        onClick={props.onClick}
      >
        <img src={item.image} alt="hinh san pham" />
        <div className={classes["item-info"]}>
          <p className={classes["product-name"]}>{item.name}</p>
          <p className={classes.price}>{price} VND</p>
        </div>
      </Link>
    </li>
  );
};

export default SearchBarItem;
