import Carousel from "react-bootstrap/Carousel";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import background from "../../assets/images/backgrounds/sub_slider_bg.jpg";

import FoodItem from "../FoodItem/Index";

const DUMMY_FOODS = [
  {
    id: 1,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 5,
    name: "Tên món ăn Tên món ăn Tên món ăn",
    description: "Mô tả món ăn Mô tả món ăn",
    price: "60000",
  },
  {
    id: 2,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 0,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
  {
    id: 3,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 3.5,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
  {
    id: 4,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 4.5,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
  {
    id: 5,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 4.5,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
];

const SubSlider = () => {

  return (
    <section style={{ backgroundImage: `url(${background})` }}>
      <Container>
        <Row>
          <Col md={6}>
            <Carousel fade pause={false} interval={null}>
              {DUMMY_FOODS.map((item) => (
                <Carousel.Item key={item.id}>
                  <Carousel.Caption style={{ position: "relative" }}>
                    <Row>
                      <Col md={6}>
                        <FoodItem item={item}></FoodItem>
                      </Col>
                      <Col md={6}>
                        <FoodItem item={item}></FoodItem>
                      </Col>
                    </Row>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col md={6}></Col>
        </Row>
      </Container>
    </section>
  );
};

export default SubSlider;
