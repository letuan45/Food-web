import Table from "react-bootstrap/Table";
import classes from "./OrderItemsList.module.css";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { toastAction } from "../../../store";

const OrderItemsList = (props) => {
  const dispatch = useDispatch();
  const { orderItems: items } = props;

  const handleChooseProduct = (product) => {
    if (product.isReviewed === 1) {
      dispatch(
        toastAction.showToast({
          message: "Bạn đã đánh giá món này",
          type: "error",
        })
      );
      return;
    }
    props.onChangeItem(product);
  };

  return (
    <Table className={classes.table}>
      <thead className={classes.header}>
        <tr>
          <th>#</th>
          <th>Món</th>
          <th>Số lượng</th>
          <th>Đơn giá</th>
          <th>Đã review</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item["id_item"]}
            className={classes["order-item"]}
            onClick={handleChooseProduct.bind(this, {
              name: item["name"],
              id: item["id_item"],
              isReviewed: item.isReviewed,
            })}
          >
            <td>{item["id_item"]}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{Number(item.quantity * item.price).toLocaleString("en")}</td>
            <td>
              {item.isReviewed === 1 ? (
                <span className={classes.reviewed}>
                  <CheckIcon />
                </span>
              ) : (
                <span className={classes["not-reviewed"]}>
                  <CloseIcon />
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrderItemsList;
