import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import classes from "./MenuList.module.css";
import MenuItem from "./MenuItem";

import menuBg from "../../assets/images/backgrounds/menu_bg.jpg";
import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

//This component has 4 array, each array preresent a category
const DUMMY_MENU = [
  {
    type: "Pasta",
    items: [
      {
        id: "f001",
        name: "Pasta",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/6-1-600x600.png",
      },
      {
        id: "f002",
        name: "Pasta",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/6-1-600x600.png",
      },
      {
        id: "f003",
        name: "Pasta",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/6-1-600x600.png",
      },
    ],
  },
  {
    type: "Đồ ngọt",
    items: [
      {
        id: "f004",
        name: "Đồ ngọt",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/10-1-600x600.png",
      },
      {
        id: "f005",
        name: "Đồ ngọt",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/10-1-600x600.png",
      },
      {
        id: "f006",
        name: "Đồ ngọt",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/10-1-600x600.png",
      },
    ],
  },
  {
    type: "Burger",
    items: [
      {
        id: "f007",
        name: "Burger",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/13-1-600x600.png",
      },
      {
        id: "f008",
        name: "Burger",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/13-1-600x600.png",
      },
      {
        id: "f009",
        name: "Burger",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/13-1-600x600.png",
      },
    ],
  },
  {
    type: "Thức uống",
    items: [
      {
        id: "f0010",
        name: "Nước ép dâu",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1-600x600.png",
      },
      {
        id: "f0011",
        name: "Nước ép dâu",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1-600x600.png",
      },
      {
        id: "f0012",
        name: "Nước ép dâu",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1-600x600.png",
      },
    ],
  },
];

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
        {error && <p>{error.data.message}</p>}
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
