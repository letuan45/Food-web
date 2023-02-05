import { useRef } from "react";

import classes from "./BurgerOff.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import burger from "../../assets/images/advertise/h_burger.png";
import Button from "../../components/UI/Button";

import off from "../../assets/images/parallax_decors/50-off.png";

import { useOnScreen } from "../../hooks/use-on-screen";

const BurgerOff = () => {
  const animationRef = useRef(null);
  const isOnScreen = useOnScreen(animationRef);

  return (
    <section
      className="burger-off"
      style={{ padding: "120px 0", overflow: "hidden" }}
    >
      <Container className={classes.container}>
        <Row>
          <Col
            lg={6}
            className={`position-relative ${isOnScreen ? "fade-right" : ""}`}
            ref={animationRef}
          >
            <img src={off} alt="giảm giá" className={classes.off}></img>
            <img src={burger} alt="ảnh hamburger" className={classes.burger} />
          </Col>
          <Col lg={6} className={`${isOnScreen ? "fade-left" : ""}`}>
            <div className={classes.content}>
              <h2>Ưu đãi Burger</h2>
              <h1>Giảm giá Burger vào cuối tuần</h1>
              <p>
                Chương trình áp dụng khuyến mãi trong tháng 3 đối với các sản
                phầm burger được mua vào các ngày cuối tuần, chương trình khuyến
                mãi được áp dụng cho cả đơn hàng offline và online, tất cả các
                chi nhánh.
              </p>
              <Link to="/cart" className={classes.btn}>
                <Button>Xem giỏ hàng</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BurgerOff;
