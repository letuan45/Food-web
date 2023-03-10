import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import classes from "./MenuList.module.css";
import MenuItem from "./MenuItem";

import menuBg from "../../assets/images/backgrounds/menu_bg.jpg";
import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

const MenuList = () => {
  const URL = "/items/category";
  const { response, error } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: URL,
  });

  const PRODUCTS = response ? response : null;
  let products = {};
  if (PRODUCTS) {
    for (let product of PRODUCTS) {
      if (!products[[product["name_type"]]]) {
        products[[product["name_type"]]] = [];
      }
      products[[product["name_type"]]].push(product);
    }
  }

  let content;
  if (Object.keys(products).length > 0) {
    content = Object.keys(products)
      .map((key) => {
        return { items: products[key], type: key };
      })
      .slice(0, 4);
  }

  return (
    <section
      className="menu"
      style={{
        marginTop: "100px",
        backgroundImage: `url(${menuBg})`,
        padding: "60px 0 100px 0",
      }}
    >
      <Container>
        {error && <p>Lỗi không lấy được menu</p>}
        <div className={classes["section-header"]}>
          <h1>Menu theo loại</h1>
          <h2>Các món ăn tiêu biểu</h2>
        </div>
        <Row>
          {content &&
            content.map((item, index) => (
              <Col lg={6} style={{ padding: "12px" }} key={index}>
                <MenuItem items={item.items} type={item.type} />
              </Col>
            ))}
        </Row>
      </Container>
    </section>
  );
};

export default MenuList;
