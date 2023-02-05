import { useRef } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import classes from "./OurServices.module.css";

//images
import cardIcon from "../../assets/icons/atm-card.png";
import onlineBookingIcon from "../../assets/icons/online-booking.png";
import deliveryIcon from "../../assets/icons/food-delivery.png";
import shopIcon from "../../assets/icons/shop.png";

import { useOnScreen } from "../../hooks/use-on-screen";

const serviceItems = [
  {
    id: 1,
    icon: (
      <div className={classes.icon} style={{ backgroundColor: "#f9887c" }}>
        <img src={cardIcon} alt="icon thẻ"></img>
      </div>
    ),
    header: "Thanh toán thẻ",
    content: "Cho phép giao dịch điện tử hoặc bằng thẻ",
  },
  {
    id: 2,
    icon: (
      <div className={classes.icon} style={{ backgroundColor: "#60a7c5" }}>
        <img src={onlineBookingIcon} alt="icon đặt hàng"></img>
      </div>
    ),
    header: "Đặt hàng online",
    content: "Đặt hàng trực tuyến, chúng tôi sẽ tiếp nhận đơn hàng",
  },
  {
    id: 3,
    icon: (
      <div className={classes.icon} style={{ backgroundColor: "#5a8385" }}>
        <img src={deliveryIcon} alt="icon giao hàng"></img>
      </div>
    ),
    header: "Giao hàng 1h",
    content: "Giao hàng nội thành TPHCM trong tối đa 1 giờ",
  },
  {
    id: 4,
    icon: (
      <div className={classes.icon} style={{ backgroundColor: "#e9b630" }}>
        <img src={shopIcon} alt="icon thẻ"></img>
      </div>
    ),
    header: "Đa chi nhánh",
    content: "Hiện có 12 chi nhánh của chúng tôi tại TPHCM",
  },
];

const OurServices = () => {
  const animationRef = useRef(null);
  const isOnScreen = useOnScreen(animationRef);

  const animationRefHeader = useRef(null);
  const isOnScreen2 = useOnScreen(animationRef);

  return (
    <section className="our-service" style={{ padding: "80px 0" }}>
      <Container>
        <div className={classes["section-header"]} ref={animationRefHeader}>
          <h2 className={`${isOnScreen2 ? "fade-bot" : ""} delay-1`}>
            Dịch vụ của chúng tôi
          </h2>
          <h1 className={`${isOnScreen2 ? "fade-bot" : ""} delay-1`}>
            Tại sao nên chọn Poco?
          </h1>
        </div>
        <Row ref={animationRef}>
          {serviceItems.map((item, index) => (
            <Col
              lg={3}
              md={6}
              key={item.id}
              style={{ padding: "12px" }}
              className={`${isOnScreen ? "fade-right" : ""} delay-${index}`}
            >
              <div className={classes["item-card"]}>
                {item.icon}
                <h5>{item.header}</h5>
                <p>{item.content}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default OurServices;
