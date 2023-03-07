import { useSelector } from "react-redux";

import SellIcon from "@mui/icons-material/Sell";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import UserProfile from ".././UserProfile/UserProfile";
import classes from "./OrdersPageMain.module.css";
import Col from "react-bootstrap/Col";
import PaymentsIcon from "@mui/icons-material/Payments";
import orangeBg from "../../assets/images/backgrounds/orange.png";
import greenBg from "../../assets/images/backgrounds/green.jpg";
import OrderList from "../Orders/OrderList";
import { useState } from "react";

const OrdersPageMain = () => {
  const user = useSelector((state) => state.auth.user);
  const [totalLength, setTotalLength] = useState(0);

  const changeTotalLengthHandler = (value) => {
    setTotalLength(value);
  };

  if (!user) {
    return (
      <p
        style={{
          padding: "60px 0",
          textAlign: "center",
          color: "var(--grey-dark)",
          fontSize: "1.5rem",
        }}
      >
        <SellIcon />
        Bạn phải đăng nhập để xem các đơn hàng
      </p>
    );
  }

  return (
    <div style={{ padding: "80px 0" }}>
      <Container>
        <Row>
          <Col lg={6} sm={12} style={{ padding: "12px" }}>
            <UserProfile user={user} />
          </Col>
          <Col lg={6} sm={12} style={{ padding: "12px" }}>
            <Row className="h-100 m-0">
              <Col
                className={classes["summary-item"]}
                style={{
                  margin: "0 12px",
                  backgroundImage: `url(${orangeBg})`,
                  backgroundSize: "cover",
                }}
              >
                <SellIcon />
                <p>Tổng hóa đơn: {totalLength}</p>
              </Col>
              <Col
                className={classes["summary-item"]}
                style={{
                  margin: "0 12px",
                  backgroundImage: `url(${greenBg})`,
                  backgroundSize: "cover",
                }}
              >
                <PaymentsIcon />
                <p>Tổng chi: 1,200,000 VND</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <OrderList changeLength={changeTotalLengthHandler} />
      </Container>
    </div>
  );
};

export default OrdersPageMain;
