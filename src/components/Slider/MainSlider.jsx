import classes from "./MainSlider.module.css";
import Carousel from "react-bootstrap/Carousel";

import "./slider-style.css";

import bg_1 from "../../assets/images/slider/slider_bg_1.jpg";
import bg_2 from "../../assets/images/slider/slider_bg_2.jpg";
import bg_3 from "../../assets/images/slider/slider_bg_3.jpg";

import chillies from "../../assets/images/slider/chillies.png";
import salad from "../../assets/images/slider/salad.png";
import leaf1 from "../../assets/images/slider/leaf_1.png";
import leaf2 from "../../assets/images/slider/leaf_2.png";
import potato from "../../assets/images/slider/half_potato.png";

import pasta from "../../assets/images/slider/pasta.png";
import duck from "../../assets/images/slider/duck.png";
import friedChicken from "../../assets/images/slider/fried_chicken.png";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FillingButton from "../UI/Button/FillingButton";
import { NavLink } from "react-router-dom";

const sliderItems = [
  {
    id: 1,
    img: bg_1,
    objImg: pasta,
    header_1: "Ưu đãi hấp dẫn",
    header_2: "Menu đa dạng",
    header_3: "Số lượng có hạn",
    header_4: {
      content: "Order ngay với mã giảm giá: ",
      code: "SUPER50",
    },
    button: {
      content: "Order ngay",
      link: "/order",
    },
  },
  {
    id: 2,
    img: bg_2,
    objImg: duck,
    header_1: "Nóng hổi và tươi sạch",
    header_2: "Ẩm thực Ý",
    header_3: "Nước sốt đậm vị",
    header_4: {
      content: "Miễn phí giao hàng ngay trong hôm nay: ",
      code: "HOT30",
    },
    button: {
      content: "Xem menu",
      link: "/shop",
    },
  },
  {
    id: 3,
    img: bg_3,
    objImg: friedChicken,
    header_1: "Chất lượng cao",
    header_2: "Ưu đãi cho bạn",
    header_3: "Hương vị giòn tan",
    header_4: {
      content: "Giảm giá đặt bàn mỗi chủ nhật: ",
      code: "SUN40",
    },
    button: {
      content: "Xem menu",
      link: "/shop",
    },
  },
];

const MainSlider = () => {
  return (
    <section className={`${classes.slider} big-slider`}>
      <Carousel fade pause={false} interval={5000}>
        {sliderItems.map((item) => (
          <Carousel.Item
            className="item"
            key={item.id}
            style={{ backgroundImage: `url(${item.img})` }}
          >
            <Carousel.Caption
              className={`${classes["slider-caption"]} container overflow-hidden`}
            >
              <Row className="w-100 m-0">
                <Col
                  lg={6}
                  md={5}
                  style={{ margin: "30px 0" }}
                  className={classes["h-wrapper"]}
                >
                  <h1 className={`${classes["header_1"]} h-1 head-p`}>
                    {item.header_1}
                  </h1>
                  <h1 className={`${classes["header_2"]} h-2 head-p`}>
                    {item.header_2}
                  </h1>
                  <h1 className={`${classes["header_3"]} h-3 head-p`}>
                    {item.header_3}
                  </h1>
                  <p className={`${classes["header_4"]} h-4 head-p`}>
                    {item.header_4.content} <span>{item.header_4.code}</span>
                  </p>
                  <NavLink to={item.button.link} className="slide-btn">
                    <FillingButton style={{ width: "40%" }}>
                      {item.button.content}
                    </FillingButton>
                  </NavLink>
                </Col>
                <Col
                  lg={6}
                  md={7}
                  className="position-relative"
                  style={{ margin: "30px 0" }}
                >
                  <div className={classes["item-obj"]}>
                    <img src={item.objImg} alt="object" className="obj-img" />
                  </div>
                </Col>
              </Row>
            </Carousel.Caption>
            <img
              src={chillies}
              alt="chillies"
              className={`chillies item-object`}
            />
            <img src={leaf2} alt="leaf2" className={`leaf-2 item-object`} />
            <img src={leaf1} alt="leaf1" className={`leaf-1 item-object`} />
            <img src={salad} alt="salad" className={`salad item-object`} />
            <img src={potato} alt="potato" className={`potato item-object`} />
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default MainSlider;
