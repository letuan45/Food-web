import classes from "./WishList.module.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Button from "../../components/UI/Button";
import BorderedButton from "../../components/UI/Button/BorderedButton";

const DUMMY_WISHLIST = [
  {
    id: "f007",
    idProduct: 1,
    name: "Iced Tea",
    ingredients: "Nguyên liệu sản phẩm",
    price: 30000,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/13-1-600x600.png",
  },
  {
    id: "f008",
    idProduct: 2,
    name: "Burger",
    ingredients: "Nguyên liệu sản phẩm",
    price: 30000,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/13-1-600x600.png",
  },
  {
    id: "f009",
    idProduct: 3,
    name: "Burger",
    ingredients: "Nguyên liệu sản phẩm",
    price: 30000,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/13-1-600x600.png",
  },
  {
    id: "f0010",
    idProduct: 4,
    name: "Nước ép dâu",
    ingredients: "Nguyên liệu sản phẩm",
    price: 30000,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1-600x600.png",
  },
  {
    id: "f0011",
    idProduct: 5,
    name: "Nước ép dâu",
    ingredients: "Nguyên liệu sản phẩm",
    price: 30000,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1-600x600.png",
  },
  {
    id: "f0012",
    idProduct: 6,
    name: "Nước ép dâu",
    ingredients: "Nguyên liệu sản phẩm",
    price: 30000,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1-600x600.png",
  },
];

const WishList = () => {
  return (
    <section className="wish-list-table" style={{padding: "100px 0"}}>
      <Container fluid="md">
        <Table striped bordered>
          <tbody className={classes["table-body"]}>
            {DUMMY_WISHLIST.map((item) => {
              return (
                <tr key={item.id}>
                  <td className={classes["column-image"]}>
                    <Link to="/" className={classes["product-image"]}>
                      <img src={item.image} alt="hinh anh san pham" />
                    </Link>
                  </td>
                  <td className={classes["column-des"]}>
                    <div>
                      <Link className={classes["name-item"]} to="/">
                        {item.name}
                      </Link>
                    </div>
                    <div>Giá: {item.price}</div>
                  </td>
                  <td className={classes['btn-group']}>
                    <Link to={`/add-to-cart/${item.idProduct}`}>
                      <Button>Thêm vào giỏ hàng</Button>
                    </Link>
                    <Link to={`/wishlist/${item.idProduct}`}>
                      <BorderedButton>Xóa khỏi yêu thích</BorderedButton>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </section>
  );
};

export default WishList;
