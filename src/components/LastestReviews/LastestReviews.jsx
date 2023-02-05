import Carousel from "react-bootstrap/Carousel";

import classes from "./LastestReviews.module.css";
import background from "../../assets/images/backgrounds/h_latest-review.jpg";
import PersonIcon from "@mui/icons-material/Person";

import RatingStars from "../UI/RatingStars/Index";
import "./l-r-style.css";

const DUMMY_REVIEWS = [
  {
    id: 1,
    stars: 5,
    customerName: "Lê Tuấn",
    productName: "Burger",
    comment:
      "Đồ ăn chất lượng, nhân viên phục vụ nhiệt tình, ủng hộ shop lần sau.",
  },
  {
    id: 2,
    stars: 2.5,
    customerName: "Lê Tuấn",
    productName: "Burger",
    comment:
      "Đồ ăn chất lượng, nhân viên phục vụ nhiệt tình, ủng hộ shop lần sau.",
  },
  {
    id: 3,
    stars: 4,
    customerName: "Lê Tuấn",
    productName: "Burger",
    comment:
      "Đồ ăn chất lượng, nhân viên phục vụ nhiệt tình, ủng hộ shop lần sau.",
  },
  {
    id: 4,
    stars: 3,
    customerName: "Lê Tuấn",
    productName: "Burger",
    comment:
      "Đồ ăn chất lượng, nhân viên phục vụ nhiệt tình, ủng hộ shop lần sau. Đồ ăn chất lượng, nhân viên phục vụ nhiệt tình, ủng hộ shop lần sau.",
  },
];

//Get 4 lastest Review
const LastestReviews = () => {
  return (
    <section className="latest-review">
      <div
        style={{
          position: "absolute",
          backgroundImage: `url(${background})`,
          backgroundPosition: "center -350px",
          width: "100%",
          height: "400px",
          filter: "brightness(40%)",
        }}
      ></div>
      <Carousel
        pause={false}
        interval={6000}
        style={{
          position: "relative",
        }}
        className={classes.slider}
      >
        {DUMMY_REVIEWS.map((item) => (
          <Carousel.Item className={classes["slide-item"]} key={item.id}>
            <Carousel.Caption>
              <div className={classes.avatar}>
                <PersonIcon />
              </div>
              <div className={classes["comment-wrapper"]}>
                <RatingStars rating={item.stars} />
                <p className={classes.comment}>"{item.comment}"</p>
                <div className={classes.info}>
                  <h5>Khách hàng: {item.customerName}</h5>
                  <div to="/shop/1" className={classes.linker}>
                    Món: {item.productName}
                  </div>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default LastestReviews;
