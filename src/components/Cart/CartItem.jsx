import classes from "./CartItem.module.css";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = (props) => {
  const { item } = props;
  const subTotal = Number(item.price * item.quantity).toLocaleString("en");
  const price = Number(item.price).toLocaleString("en");

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
            <input type="number" defaultValue={item.quantity}/>
            <Link to={`/product/minus/${item.id}`}>
              <RemoveCircleOutlineIcon />
            </Link>
          </div>
          <div className={classes.total}>
            Tổng: <span>{subTotal} VND</span>
          </div>
        </div>
        <Link className={classes.remove}>
          <DeleteIcon/>
        </Link>
      </div>
    </li>
  );
};

export default CartItem;
