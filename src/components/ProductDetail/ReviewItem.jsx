import classes from "./ReviewItem.module.css";
import RatingStars from "../../components/UI/RatingStars/Index";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";

const ReviewItem = (props) => {
  const { item } = props;
  const itemDateString = item.date.toDateString(); 

  return (
    <li className={classes.item}>
      <img
        src="https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=60&d=mm&r=g"
        alt="hình user"
        className={classes["user-img"]}
      />
      <div className={classes["content-wrapper"]}>
        <RatingStars rating={item.rating} />
        <div className={classes["name-and-date"]}>
          <p>{item.userName}</p>
          <span className={classes["date"]}>
            <WatchLaterRoundedIcon />
            {itemDateString}
          </span>
        </div>
        <p className={classes["comment"]}>{item.comment}</p>
      </div>
    </li>
  );
};

export default ReviewItem;
