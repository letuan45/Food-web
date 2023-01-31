import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import combo from "../../assets/images/banner/combo.png";
import pizza from "../../assets/images/banner/pizza.png";
import burger from "../../assets/images/banner/burger.png";
import chicken from "../../assets/images/banner/chicken.png";
import pasta from "../../assets/images/banner/pasta.png";
import drinks from "../../assets/images/banner/drinks.png";

import BannerItem from "./BannerItem";

const BannerItems = [
  {
    id: 1,
    name: "combo",
    link: "/shop/combo",
    image: combo,
  },
  {
    id: 2,
    name: "pizza",
    link: "/shop/pizza",
    image: pizza,
  },
  {
    id: 3,
    name: "burger",
    link: "/shop/burger",
    image: burger,
  },
  {
    id: 4,
    name: "gà rán",
    link: "/shop/chicken",
    image: chicken,
  },
  {
    id: 5,
    name: "khác",
    link: "/shop/orther",
    image: pasta,
  },
  {
    id: 6,
    name: "đồ uống",
    link: "/shop/drink",
    image: drinks,
  },
];

const BannerList = () => {
  return (
    <section className="banner">
      <ul style={{ backgroundColor: "var(--green)", padding: "22px 20px" }}>
        <Container>
          <Row>
            {BannerItems.map((item) => (
              <BannerItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </ul>
    </section>
  );
};

export default BannerList;
