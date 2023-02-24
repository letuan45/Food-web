import classes from "./SideCartList.module.css";

import ShopIcon from "@mui/icons-material/Shop";
import SideCartItem from "./SideCartItem";

const SideCartList = (props) => {
  const { cartItems } = props;

  if (!cartItems) {
    return (
      <div className={classes.empty}>
        <ShopIcon />
        <p>Đã có lỗi khi đang lấy giỏ hàng.</p>
      </div>
    );
  }

  if (cartItems.length === 0)
    return (
      <div className={classes.empty}>
        <ShopIcon />
        <p>Giỏ hàng của bạn hiện đang trống.</p>
      </div>
    );

  return (
    <ul className={classes.list}>
      {cartItems.map((item) => (
        <SideCartItem key={item["id_item"]} item={item} />
      ))}
    </ul>
  );
};

export default SideCartList;
