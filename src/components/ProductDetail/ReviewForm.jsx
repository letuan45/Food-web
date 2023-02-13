import TextArea from "../../components/UI/Input/TextArea";
import classes from "./ReviewForm.module.css";
import Rating from "@mui/material/Rating";
import Button from "../../components/UI/Button";

import { useState } from "react";

const ReviewForm = () => {
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(ratingValue, comment);

    //reset form
    setRatingValue(0);
    setComment("");
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className={classes["form-warn"]}>
        Những trường bắt buộc được gắn dấu <span>*</span>
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
      <div style={{ marginTop: "20px", width: "50%" }}>
        <Button type="submit">Đăng bình luận </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
