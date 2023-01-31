import classes from "./BannerItem.module.css";
import { Link } from "react-router-dom";

const BannerItem = (props) => {
  const { item } = props;

  return (
    <li
      className="col-md-2 col-4"
      style={{ paddingTop: "10px", paddingBottom: "10px" }}
    >
      <Link to={item.link} className={classes.item}>
        <div className={classes.image}>
          <img src={item.image} alt={item.name} />
        </div>
        <div className={classes.caption}>{item.name}</div>
      </Link>
    </li>
  );
};

export default BannerItem;
