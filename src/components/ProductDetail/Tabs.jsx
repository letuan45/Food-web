import { useState } from "react";
import classes from "./Tabs.module.css";
import ReviewItem from "./ReviewItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";

const Tabs = (props) => {
  const { productId } = props;
  const [tabState, setTabState] = useState(1);
  const { description } = props;
  const getReviewURL = `reviews/${productId}`;

  const { response } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getReviewURL,
  });

  const REVIEWS = response ? response : [];

  let reviewList = (
    <p className={classes["empty-rv"]}>Không có đánh giá nào cho món này.</p>
  );

  if (REVIEWS && REVIEWS.length > 0) {
    reviewList = (
      <ul>
        {REVIEWS.map((item, index) => (
          <ReviewItem item={item} key={index} />
        ))}
      </ul>
    );
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
              Review ({REVIEWS.length})
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
          </Row>
        )}
      </div>
    </div>
  );
};

export default Tabs;
