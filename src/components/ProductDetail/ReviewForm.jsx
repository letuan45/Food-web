import { useEffect, useState } from "react";

import { toastAction } from "../../store";
import TextArea from "../../components/UI/Input/TextArea";
import classes from "./ReviewForm.module.css";
import Rating from "@mui/material/Rating";
import Button from "../../components/UI/Button";
import { useDispatch } from "react-redux";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import httpClient from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const ReviewForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const { product, orderId } = props;
  const reviewURL = `/reviews/${product ? product.id : ""}`;

  const {
    response: reviewResponse,
    error: reviewError,
    loading: reviewIsLoading,
    axiosFetch: callReview,
  } = useAxiosFunction();

  useEffect(() => {
    if (reviewError) {
      dispatch(
        toastAction.showToast({
          message: reviewError.data.message,
          type: "error",
        })
      );
      return;
    }
    if (reviewResponse) {
      dispatch(
        toastAction.showToast({
          message: reviewResponse.message,
          type: "success",
        })
      );
      navigate(`/orders/${orderId}`);
    }
  }, [reviewResponse, reviewError, dispatch, navigate, orderId]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!product) {
      dispatch(
        toastAction.showToast({
          message: "Vui lòng chọn món để đánh giá",
          type: "error",
        })
      );
      return;
    }
    if (ratingValue === 0 || comment === "") {
      dispatch(
        toastAction.showToast({
          message: "Vui lòng nhập đầy đủ thông tin",
          type: "error",
        })
      );
      return;
    }

    callReview({
      axiosInstance: httpClient,
      method: "POST",
      url: reviewURL,
      requestConfig: {
        data: {
          rating: ratingValue,
          comment: comment,
        },
        params: {
          id_order: orderId
        },
      },
    });

    //reset form
    setRatingValue(0);
    setComment("");
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className={classes["form-warn"]}>
        Những trường bắt buộc được gắn dấu <span>*</span>
      </div>
      <div className={classes["form-warn_2"]}>
        Đang đánh giá món:{" "}
        <span className={classes["product_name"]}>
          {product ? product.name : ""}
        </span>
      </div>
      <p className={classes["rating-label"]}>
        Đánh giá của bạn <span>*</span>
      </p>
      <Rating
        sx={{
          "& .MuiSvgIcon-root": {
            width: "1.8rem",
            height: "1.8rem",
          },
        }}
        name="ratingValue"
        value={ratingValue}
        precision={1}
        onChange={(event) => {
          setRatingValue(+event.target.value);
        }}
      />
      <div className={classes.comment}>
        <TextArea
          label="Nhận xét của bạn"
          isRequired
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
      </div>

      <div
        style={{  }}
        className={classes["btn-wrapper"]}
      >
        <Button type="submit">
          {reviewIsLoading ? <LoadingSpinner /> : "Đăng đánh giá"}
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
