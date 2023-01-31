import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import classes from "./HomePageFoods.module.css";
import FoodItem from "../FoodItem/Index";

import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

//Parallax items
import decor1 from "../../assets/images/parallax_decors/h_product_1.png";
import decor2 from "../../assets/images/parallax_decors/h_product_2.png";
import decor3 from "../../assets/images/parallax_decors/h_product_3.png";

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
];

//Component has maximum 4 items
const HomePageFoods = () => {
  return (
    <section className="popular-dishes">
      <div className={classes["main-wrapper"]}>
        <div
          className={`${classes["parallax-items"]} ${classes["parallax-item__1"]}`}
        >
          <img src={decor1} alt="parallax item 1" />
        </div>
        <div
          className={`${classes["parallax-items"]} ${classes["parallax-item__2"]}`}
        >
          <img src={decor2} alt="parallax item 2" />
        </div>
        <div
          className={`${classes["parallax-items"]} ${classes["parallax-item__3"]}`}
        >
          <img src={decor3} alt="parallax item 3" />
        </div>
        <Container>
          <div className={classes["section-header"]}>
            <h1>Phổ biến nhất</h1>
            <Link to="/shop" className={classes["see-more"]}>
              <p>Xem thêm</p>
              <span>
                <KeyboardArrowRightRoundedIcon />
              </span>
            </Link>
          </div>
          <div className={classes["wrapper"]}>
            <ul
              className={`${classes["foods-list"]} row justify-content-center`}
            >
              {DUMMY_FOODS.map((item) => (
                <FoodItem
                  item={item}
                  className="col-lg-3 col-md-4"
                  key={item.id}
                />
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default HomePageFoods;
