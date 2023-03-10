import Carousel from "react-bootstrap/Carousel";

import classes from "./LastestReviews.module.css";
import background from "../../assets/images/backgrounds/h_latest-review.jpg";
import PersonIcon from "@mui/icons-material/Person";

import RatingStars from "../UI/RatingStars/Index";
import "./l-r-style.css";
import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

//Get 4 lastest Review
const LastestReviews = () => {
  const URL = "/reviews/detail/get";
  const { response: reviews, error: reviewError } = useAxios({
    axiosInstance: httpClient,
    method: 'GET',
    url: URL,
  });

  let content;
  if (reviewError) {
    content = <p>Lỗi không lấy được review</p>;
  } else if (reviews && reviews.length > 0) {
    content = reviews.map((item, index) => (
      <Carousel.Item className={classes["slide-item"]} key={index}>
        <Carousel.Caption>
          <div className={classes.avatar}>
            <PersonIcon />
          </div>
          <div className={classes["comment-wrapper"]}>
            <RatingStars rating={item.rating} />
            <p className={classes.comment}>"{item.comment}"</p>
            <div className={classes.info}>
              <h5>Khách hàng: {item["name_customer"]}</h5>
              <div to="/shop/1" className={classes.linker}>
                Món: {item["name_item"]}
              </div>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    ));
  }

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
        {content}
      </Carousel>
    </section>
  );
};

export default LastestReviews;
