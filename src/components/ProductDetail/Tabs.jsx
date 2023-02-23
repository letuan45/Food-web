import { useState } from "react";
import classes from "./Tabs.module.css";
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DUMMY_REVIEW = [
  {
    id: 1,
    userName: "Tuấn",
    rating: 5,
    comment:
      "I am 6 feet tall and 220 lbs. This shirt fit me perfectly in the chest and shoulders. My only complaint is that it is so long! I like to wear polo shirts untucked. This shirt goes completely past my rear end. If I wore it with ordinary shorts, you probably wouldnt be able to see the shorts at all – completely hidden by the shirt. It needs to be 4 to 5 inches shorter in terms of length to suit me. I have many RL polo shirts, and this one is by far the longest. I dont understand why.",
    date: new Date(),
  },
  {
    id: 2,
    userName: "Tuấn Lê",
    rating: 1,
    comment: "Vị như đuồi bầu",
    date: new Date(),
  },
];

const Tabs = (props) => {
  const [tabState, setTabState] = useState(1);
  const {description} = props;

  let reviewList = (
    <p className={classes["empty-rv"]}>Không có đánh giá nào cho món này.</p>
  );

  if (DUMMY_REVIEW || DUMMY_REVIEW.length > 0) {
    reviewList = DUMMY_REVIEW.map((item) => (
      <ReviewItem item={item} key={item.id} />
    ));
  }

  const toggleTab = (state) => {
    setTabState(state);
  };

  return (
    <div className={classes.description}>
      <div className={classes["tabs-buttons-wrapper"]}>
        <Row style={{ margin: "0 -30px", flexWrap: "nowrap" }}>
          <Col
            style={{
              padding: "10px 30px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              className={
                tabState === 1 ? classes["button-active"] : classes[""]
              }
              onClick={() => toggleTab(1)}
            >
              Mô tả
            </button>
          </Col>
          <Col
            style={{
              padding: "10px 30px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              className={
                tabState === 2 ? classes["button-active"] : classes[""]
              }
              onClick={() => toggleTab(2)}
            >
              Review (14)
            </button>
          </Col>
        </Row>
      </div>
      <div className={classes["tabs-content-wrapper"]}>
        {tabState === 1 && (
          <p className={classes["desc-content"]}>{description}</p>
        )}
        {tabState === 2 && (
          <Row style={{ margin: "0 -30px" }}>
            <Col md={12} style={{ padding: "10px 30px" }}>
              {reviewList}
            </Col>
            {/* <Col md={6} style={{ padding: "10px 30px" }}>
              <ReviewForm />
            </Col> */}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Tabs;
