import { useRef } from "react";

import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";

import classes from "./HomePageFoods.module.css";
import FoodItem from "../FoodItem/Index";

import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

import { useOnScreen } from "../../hooks/use-on-screen";
import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";
import useWishlistTransform from "../../hooks/useWishlistTransform";

//Parallax items
import decor1 from "../../assets/images/parallax_decors/h_product_1.png";
import decor2 from "../../assets/images/parallax_decors/h_product_2.png";
import decor3 from "../../assets/images/parallax_decors/h_product_3.png";

//Component has maximum 4 items
const HomePageFoods = () => {
  const animationRef = useRef(null);
  const isOnScreen = useOnScreen(animationRef);
  const URL = "items/get";
  const {
    response: foodRes,
    error: foodsError,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: URL,
    requestConfig: {
      params: {
        "quantity": 4
      }
    }
  });

  let foodItems = foodRes ?  foodRes : []; 
  foodItems = useWishlistTransform(foodItems);

  let content;
  if(foodsError) {
    content = <p>Lỗi không lấy được danh sách</p>
  } else {
    content = (
      <ul
        ref={animationRef}
        className={`${classes["foods-list"]} row justify-content-center`}
      >
        {foodItems.map((item, index) => (
          <FoodItem
            item={item}
            className={`col-lg-3 col-md-4 ${
              isOnScreen ? "fade-bot" : ""
            } delay-${index}`}
            key={item["id_item"]}
          />
        ))}
      </ul>
    );
  }

  return (
    <section className="popular-dishes">
      <div className={classes["main-wrapper"]}>
        <div
          className={`${classes["parallax-items"]} ${classes["parallax-item__1"]}`}
        >
          <Parallax translateY={[-100, 100]}>
            <img src={decor1} alt="parallax item 1" />
          </Parallax>
        </div>

        <div
          className={`${classes["parallax-items"]} ${classes["parallax-item__2"]}`}
        >
          <Parallax translateY={[-80, 80]}>
            <img src={decor2} alt="parallax item 2" />
          </Parallax>
        </div>
        <div
          className={`${classes["parallax-items"]} ${classes["parallax-item__3"]}`}
        >
          <Parallax translateY={[-120, 80]}>
            <img src={decor3} alt="parallax item 3" />
          </Parallax>
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
          <div className={classes["wrapper"]}>{content}</div>
        </Container>
      </div>
    </section>
  );
};

export default HomePageFoods;
