import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import classes from "./ShopPageMain.module.css";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import TuneIcon from "@mui/icons-material/Tune";

import CustomPagination from "../UI/Pagination/CustomPagination";
import FoodItem from "../FoodItem/Index";
import Categories from "./Categories";
import useViewport from "../../hooks/use-viewport";
import Backdrop from "../../components/UI/Modal/Backdrop";

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
    rating: 5,
    name: "Tên món ăn Tên món ăn Tên món ăn",
    description: "Mô tả món ăn Mô tả món ăn",
    price: "60000",
  },
  {
    id: 6,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 0,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
  {
    id: 7,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 3.5,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
  {
    id: 8,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 4.5,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
  {
    id: 9,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 5,
    name: "Tên món ăn Tên món ăn Tên món ăn",
    description: "Mô tả món ăn Mô tả món ăn",
    price: "60000",
  },
  {
    id: 10,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 0,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
  {
    id: 11,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 3.5,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
  {
    id: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 4.5,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
];

const DUMMY_BEST = [
  {
    id: 1,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 0,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
  {
    id: 2,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 3.5,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
  {
    id: 3,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 4.5,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
];

const ShopPageMain = () => {
  const [orderType, setOrderType] = useState("default");
  const [cateIsOpen, setCateIsOpen] = useState(false);
  const { width: deviceWidth } = useViewport();

  const handleChangeType = (newValue) => {
    setOrderType(() => newValue);
  };

  useEffect(() => {
    if (deviceWidth > 1200) setCateIsOpen(false);
  }, [deviceWidth]);

  //Product list
  let productsContent = (
    <p className={classes["product-list"]}>
      <RemoveShoppingCartIcon />
      Rất tiếc, không có bất kì món nào.
    </p>
  );

  if (DUMMY_FOODS && DUMMY_FOODS.length > 0) {
    productsContent = (
      <ul className={`${classes["product-list"]} row`}>
        {DUMMY_FOODS.map((item) => (
          <FoodItem item={item} key={item.id} className="col-md-6 col-lg-4" />
        ))}
      </ul>
    );
  }

  const paginationLength = 10;

  //Events
  const handleOpenCate = () => {
    setCateIsOpen(true);
  };

  const handleCloseCate = () => {
    setCateIsOpen(false);
  };

  return (
    <section className="shop-page">
      {cateIsOpen && <Backdrop onClose={handleCloseCate} />}
      <div className={classes["main-wrapper"]}>
        <Container>
          <Row>
            <Col xl={9}>
              <div className={classes["display-wrapper"]}>
                <div className={classes["display-result"]}>
                  <button
                    className={classes["open-cate"]}
                    onClick={handleOpenCate}
                  >
                    <TuneIcon />
                    Danh mục
                  </button>
                  Hiển thị
                  <span> 1-12 </span>
                  Trên
                  <span> 54 </span>
                  Kết quả
                </div>
                <div className={classes["sort-wrapper"]}>
                  <form className={classes["sort-form"]} method="get">
                    <select
                      name="orderby"
                      value={orderType}
                      onChange={(event) => handleChangeType(event.target.value)}
                    >
                      <option value="default">Sắp xếp mặc định</option>
                      <option value="popularity">Sắp xếp độ phổ biến</option>
                      <option value="inc_price">Sắp xếp giá tăng dần</option>
                      <option value="des_price">Sắp xếp giá giảm dần</option>
                    </select>
                    <ExpandMoreRoundedIcon className={classes.chevron} />
                  </form>
                </div>
              </div>
              {productsContent}
              <div className={classes["pagination-wrapper"]}>
                <CustomPagination count={paginationLength} />
              </div>
            </Col>
            <Categories
              bestProduct={DUMMY_BEST}
              isModal={deviceWidth <= 1200}
              isOpened={cateIsOpen}
              onClose={handleCloseCate}
            />
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default ShopPageMain;
