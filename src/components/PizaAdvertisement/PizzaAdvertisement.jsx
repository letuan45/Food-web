import classes from "./PizzaAdvertisement.module.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Parallax } from "react-scroll-parallax";

//images
import background from "../../assets/images/backgrounds/h_pizza.jpg";
import bigPizza from "../../assets/images/parallax_decors/h_pizza.png";
import leaf_1 from "../../assets/images/parallax_decors/pizza-leaf-1.png";
import leaf_2 from "../../assets/images/parallax_decors/pizza-leaf-2.png";
import mushroom from "../../assets/images/parallax_decors/pizza-mushroom.png";
import smallPizza from "../../assets/images/parallax_decors/h_pizza_s.png";

const PizzaAdvertisement = () => {
  return (
    <section
      className="pizza-advertisement"
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "bottom",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className={classes.decorators}>
        <img src={leaf_1} alt="lá 1" className={classes.leaf1}></img>
        <img src={leaf_2} alt="lá 2" className={classes.leaf2}></img>
        <Parallax translateY={[-35, 35]}>
          <img
            src={smallPizza}
            alt="pizza nhỏ"
            className={classes["small-pizza"]}
          ></img>
        </Parallax>

        <img src={mushroom} alt="nấm" className={classes.mushroom}></img>
      </div>
      <Row style={{ zIndex: "1", overflow: "hidden" }}>
        <Col lg={6}>
          <div className={classes["big-pizza-wrapper"]}>
            <Parallax translateY={[30, -30]} className="w-100">
              <img
                src={bigPizza}
                alt="pizza lớn"
                className={classes["big-pizza"]}
              />
            </Parallax>
          </div>
        </Col>
        <Col lg={6}>
          <div className={classes.content}>
            <div className={classes.headers}>
              <h1>Super</h1>
              <h1>Delicious</h1>
              <h1>Pizza</h1>
            </div>
            <div className={classes.inner}>
              Giải quyết cơn đói của bạn? Gọi ngay Poco
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default PizzaAdvertisement;
