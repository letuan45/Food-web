import classes from "./ShopPageMain.module.css";

import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import { createPortal } from "react-dom";

import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import IcecreamIcon from "@mui/icons-material/Icecream";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import SearchBar from "../UI/SearchBar/SearchBar";
import Col from "react-bootstrap/Col";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

import FoodItemVertical from "../FoodItem/FoodItemVertical";
import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";
import { useParams } from "react-router";

const cateItemIcons = [
  <LunchDiningIcon />,
  <LocalBarIcon />,
  <IcecreamIcon />,
  <RamenDiningIcon />,
  <LocalPizzaIcon />,
  <FastfoodIcon />,
];

const Content = (props) => {
  const getTypesURL = "/types";
  const { idType } = useParams();
  //Lấy danh sách loại sản phẩm
  const { response: typesResponse, error: typesError } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getTypesURL,
  });
  const categories = typesResponse ? typesResponse : null;
  const { bestDealContent, isOpened, onClose } = props;

  if (!categories || typesError) {
    return <p>Không tải được danh mục</p>;
  }

  const generatedCategories = categories.map((item, index) => {
    return { item, icon: cateItemIcons[index] };
  });

  return (
    <Col
      xl={3}
      className={`${classes["cate-group"]} ${isOpened ? classes.open : ""}`}
    >
      <button className={classes.close} onClick={onClose}>
        <CloseIcon />
      </button>
      <div className={classes["cate-wrapper"]}>
        <h4 className={classes["cate-header"]}>Danh mục</h4>
        <ul className={classes["cate-list"]}>
          {generatedCategories.map((cate) => (
            <li className={classes["cate-item"]} key={cate.item["id_type"]}>
              <NavLink
                to={`/items/id_type/${cate.item["id_type"]}`}
                className={
                  +idType === cate.item["id_type"] ? classes.active : ""
                }
                onClick={props.onChange}
              >
                <div className={classes["cate-item-wrapper"]}>
                  <div className={classes["cate-title"]}>
                    {cate.icon}
                    <span>{cate.item.name}</span>
                  </div>
                  <div>({cate.item.quantity})</div>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes["search-wrapper"]}>
        <SearchBar placeholder="Tìm món..." />
      </div>
      <div className={classes["best-deal"]}>
        <h2 className={classes["best-deal__header"]}>Hot trong tháng</h2>
      </div>
      {bestDealContent}
    </Col>
  );
};

const Categories = (props) => {
  const { bestProduct, isModal, isOpened, onClose } = props;

  let bestDealContent = (
    <p className={classes["empty-best"]}>
      <RemoveShoppingCartIcon />
      Rất tiếc, không có bất kì món nào.
    </p>
  );

  if (bestProduct && bestProduct.length > 0) {
    bestDealContent = (
      <ul className={classes["best-deal-list"]}>
        {bestProduct.map((item) => (
          <FoodItemVertical
            key={item.id}
            item={item}
            style={{ margin: "10px 0" }}
          />
        ))}
      </ul>
    );
  }

  if (isModal) {
    return (
      <Fragment>
        {createPortal(
          <Content
            bestDealContent={bestDealContent}
            categories={props.categories ? props.categories : null}
            isOpened={isOpened}
            onChange={props.onChange}
            onClose={onClose}
          ></Content>,
          document.getElementById("overlay-root")
        )}
      </Fragment>
    );
  }

  return (
    <Content
      bestDealContent={bestDealContent}
      onChange={props.onChange}
    ></Content>
  );
};

export default Categories;
