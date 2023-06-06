import classes from "./OrderDetail.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import SendIcon from "@mui/icons-material/Send";

import httpClient from "../../utils/axiosInstance";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import CancelButton from "./CancelButton/CancelButton";
import OrderItemsList from "./OrderItemsList/OrderItemsList";
import ReviewForm from "../ProductDetail/ReviewForm";
import { useCallback, useEffect, useState } from "react";

const StatusItem = (props) => {
  const { status } = props;

  if (status === 0) {
    return (
      <span className={`${classes.status} ${classes.yellow}`}>
        Chưa xác nhận
      </span>
    );
  }
  if (status === 1) {
    return (
      <span className={`${classes.status} ${classes.green}`}>Đã xác nhận</span>
    );
  }
  //2
  return <span className={`${classes.status} ${classes.red}`}>Đã hủy</span>;
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const orderDetailURL = `/orders/detail/${orderId}`;
  const [reviewProduct, setReviewProduct] = useState(null);
  const [orderStatus, setOrderStatus] = useState(0);

  const { response } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: orderDetailURL,
  });

  useEffect(() => {
    if (response) {
      setOrderStatus(response.status);
    }
  }, [response]);

  const cancelOrderHandler = useCallback(() => {
    setOrderStatus(2);
  }, []);

  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return (
      <div className={classes.empty}>
        <ProductionQuantityLimitsIcon />
        Bạn phải đăng nhập để xem chi tiết đơn hàng
      </div>
    );
  }

  if (!response) {
    return (
      <div className={classes.empty}>
        <ProductionQuantityLimitsIcon />
        Lỗi khi lấy chi tiết đơn hàng
      </div>
    );
  }

  const handleChangeItem = (product) => {
    setReviewProduct(product);
  };

  const ORDER = response;
  const totalPrice = Number(ORDER.total).toLocaleString("en");

  return (
    <Container>
      <h1 className={classes.header}>
        <SendIcon />
        Thông tin Đơn hàng #{orderId}
      </h1>
      <Row>
        <Col lg={4}>
          <div className={classes["order-infor"]}>
            <ul className={classes["infor-list"]}>
              <li className={classes["info-item"]}>
                Đặt lúc: <span>{ORDER.datetime}</span>
              </li>
              <li className={classes["info-item"]}>
                Tình trạng: <StatusItem status={orderStatus} />
              </li>
              <li className={classes["info-item"]}>
                Khách hàng: <span>{user.name}</span>
              </li>
              <li className={classes["info-item"]}>
                Địa chỉ nhận: <span>{user.address}</span>
              </li>
              <li className={classes["info-item"]}>
                SĐT: <span>{user.phone}</span>
              </li>
            </ul>
            <div className={classes.control}>
              <span className={classes["total-price"]}>
                Tổng tiền: <span>{totalPrice} VND</span>
              </span>
              <CancelButton
                orderStatus={orderStatus}
                itemId={orderId}
                cancelOrder={cancelOrderHandler}
              />
            </div>
          </div>
        </Col>
        <Col lg={8}>
          <Row>
            <Col lg={12}>
              <div className={classes["order-infor"]}>
                <h4 className={classes["table-header"]}>
                  Hãy đánh giá món còn chưa được đánh giá bằng cách chọn món
                </h4>
                <OrderItemsList
                  orderItems={ORDER.itemList}
                  onChangeItem={handleChangeItem}
                />
              </div>
            </Col>
            {(orderStatus !== 0 && orderStatus !== 2) && (
              <Col lg={12}>
                <div className={classes["order-infor"]}>
                  <ReviewForm product={reviewProduct} orderId={orderId} />
                </div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetail;
