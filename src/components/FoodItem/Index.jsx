import WishButton from "../UI/Button/WishButton";
import { Link } from "react-router-dom";

//icons
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import classes from "./Index.module.css";
import RatingStars from "../UI/RatingStars/Index";

const Index = (props) => {
  const { item, className } = props;
  const itemId = item.id;
  const price = Number(item.price).toLocaleString("en");

  return (
    <li className={className} style={{padding: "12px"}}>
      <div className={classes.item}>
        <Link to={`shop/${itemId}`} className={classes["image-link"]}>
          <div className={classes.image}>
            <img src={item.image} alt={`product ${item.name}`} />
          </div>
        </Link>
        <div className={classes.wish}>
          <WishButton itemId={itemId} />
        </div>
        <div className={classes.caption}>
          <div className={classes.rating}>
            <RatingStars rating={item.rating} />
          </div>
          <Link to={`shop/${itemId}`} className={classes.name}>
            {item.name}
          </Link>
          <p className={classes.description}>{item.description}</p>
          <div className="d-flex align-items-center justify-content-between">
            <span className={classes.price}>{price} VND</span>
            <Link to={`add-to-cart/${itemId}`} className={classes['to-cart-btn']}>
              <ShoppingBasketIcon></ShoppingBasketIcon>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Index;
