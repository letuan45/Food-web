import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";

import Button from "../../components/UI/Button";

import deliveryMan from "../../assets/images/parallax_decors/delivery-man.png";
import chatBubble from "../../assets/images/parallax_decors/chat-bubble.png";
import classes from "./Delivery.module.css";

const Delivery = () => {
  return (
    <section
      className="delivery"
      style={{ backgroundColor: "#fbf7e8", padding: "80px 0" }}
    >
      <Container className={classes.container}>
        <Row>
          <Col lg={4} style={{ padding: "12px" }}>
            <div
              className={`${classes["delivery-item__1"]} ${classes["delivery-item"]}`}
            >
              <h1>Nhận các đơn đặt hàng online, vận chuyển nhanh chóng</h1>
              <p>
                Đội ngũ nhân viên nhà hàng luôn sẵn sàng tiếp nhận đơn đặt hàng
                của bạn, thưởng thức món ăn của chúng tôi ở bất cứ đâu tại
                TPHCM.
              </p>
              <Link to="/order" className={classes["order-btn"]}>
                <Button>Order ngay</Button>
              </Link>
            </div>
          </Col>
          <Col lg={4}>
            <div className={classes["deli-wrapper"]}>
              <Parallax translateX={[-60, 30]}>
                <div className={classes["chat"]}>
                  <img src={chatBubble} alt="bong bóng thoại" />
                  <p>Giao hàng nội thành</p>
                </div>
                <img
                  src={deliveryMan}
                  alt="người giao hàng"
                  className={classes["delivery-man"]}
                />
              </Parallax>
            </div>
          </Col>
          <Col lg={4}>
            <div
              className={`${classes["delivery-item__2"]} ${classes["delivery-item"]}`}
            >
              <h1>Đặt hàng để tích điểm thành viên với nhiều ưu đãi hấp dẫn</h1>
              <p>
                Chỉ với vài bước đăng ký tài khoản, đặt hàng với mỗi lần thành
                công, bạn sẽ nhận được điểm thành viên để nhận được các ưu đãi
                hấp dẫn.
              </p>
              <Link to="/order" className={classes["order-btn"]}>
                <Button>Order ngay</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Delivery;
