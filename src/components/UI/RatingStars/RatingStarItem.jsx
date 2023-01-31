import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import classes from "./RatingStarItem.module.css";

const RatingStarItem = (props) => {
  const ratingPoint = props.rating;
  const ratingRemand = ratingPoint % 0.5;

  if (ratingRemand === 0 && ratingPoint <= 0)
    return (
      <li className={classes.item}>
        <StarOutlineRoundedIcon />
      </li>
    );

  if (ratingRemand === 0 && ratingPoint < 1) {
    return (
      <li className={classes.item}>
        <StarHalfRoundedIcon />
      </li>
    );
  }

  return (
    <li className={classes.item}>
      <StarRoundedIcon />
    </li>
  );
};

export default RatingStarItem;
