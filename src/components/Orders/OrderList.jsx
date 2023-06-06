import classes from "./OrderList.module.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import { useCallback, useEffect } from "react";

const StatusItem = (props) => {
  const { status } = props;

  if (status === 0) {
    return (
      <span className={`${classes.status} ${classes.yellow}`}>
        Chờ X.N
      </span>
    );
  }

  if (status === 1) {
    return (
      <span className={`${classes.status} ${classes.green}`}>Đã X.Nhận</span>
    );
  }

  //2
  return <span className={`${classes.status} ${classes.red}`}>Đã hủy</span>;
};

const OrderList = (props) => {
  const getOrdersURL = "/orders";
  const { changeLength, onChangeTotalPayment } = props;

  const hanndleChangeSummary = useCallback(
    (orders) => {
      changeLength(orders.length);
    },
    [changeLength]
  );

  const {
    response: ordersResponse,
    isLoading: orderIsLoading,
    error: orderError,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getOrdersURL,
  });

  

  let content;

  useEffect(() => {
    if (ordersResponse) {
      hanndleChangeSummary(ordersResponse);
      const totalPayment = ordersResponse.reduce((acc, item) => {
        if (item.status === 1) {
          return item.total + acc;
        }
        return 0 + acc;
      }, 0);
      onChangeTotalPayment(totalPayment);
    }
  }, [ordersResponse, hanndleChangeSummary, onChangeTotalPayment]);

  if (orderIsLoading) {
    content = (
      <div className={classes.loading}>
        <LoadingSpinner />
      </div>
    );
  } else if (orderError) {
    content = <div className={classes.empty}>orderError</div>;
  } else if (ordersResponse) {
    if (ordersResponse.length === 0) {
      content = (
        <div className={classes.empty}>
          <ProductionQuantityLimitsIcon />
          Bạn chưa có giao dịch nào gần đây!
        </div>
      );
    } else {
      content = (
        <Table className={classes.table}>
          <thead className={classes["table-header"]}>
            <tr>
              <th>Mã đơn</th>
              <th>Đặt lúc</th>
              <th>Đang đánh giá</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={classes["list_body"]}>
            {ordersResponse.map((item) => (
              <tr className={classes["table-item"]} key={item["id_order"]}>
                <td className={classes["id-item"]}>
                  <span>#{item["id_order"]}</span>
                </td>
                <td>{item.datetime}</td>
                <td
                  className={`${classes["reviewings"]} ${
                    item.reviewingCount === 0 ? classes["no_reviewing"] : ""
                  }`}
                >
                  {item.reviewingCount}
                </td>
                <td>
                  <StatusItem status={item.status} />
                </td>
                <td>
                  <Link
                    to={`/orders/${item["id_order"]}`}
                    className={classes["item-info"]}
                  >
                    <ExitToAppIcon />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
  }

  return <div className={classes.wrapper}>{content}</div>;
};

export default OrderList;
