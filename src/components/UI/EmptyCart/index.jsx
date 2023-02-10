import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import classes from "./index.module.css";

const index = () => {
  return <div className={classes.wrapper}>
    <RemoveShoppingCartIcon/>
    <p>Giỏ hàng của bạn hiện đang trống.</p>
  </div>;
};

export default index;
