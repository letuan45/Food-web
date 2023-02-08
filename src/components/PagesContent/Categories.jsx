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

const Content = (props) => {
  const { handleSearch, bestDealContent, isOpened, onClose } = props;

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
          <li className={classes["cate-item"]}>
            <NavLink
              to="./burgers"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <div className={classes["cate-item-wrapper"]}>
                <div className={classes["cate-title"]}>
                  <LunchDiningIcon />
                  <span>Burgers</span>
                </div>
                <div>(10)</div>
              </div>
            </NavLink>
          </li>
          <li className={classes["cate-item"]}>
            <NavLink
              to="./drinks"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <div className={classes["cate-item-wrapper"]}>
                <div className={classes["cate-title"]}>
                  <LocalBarIcon />
                  <span>Đồ uống</span>
                </div>
                <div>(10)</div>
              </div>
            </NavLink>
          </li>
          <li className={classes["cate-item"]}>
            <NavLink
              to="./sweets"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <div className={classes["cate-item-wrapper"]}>
                <div className={classes["cate-title"]}>
                  <IcecreamIcon />
                  <span>Đồ ngọt</span>
                </div>
                <div>(10)</div>
              </div>
            </NavLink>
          </li>
          <li className={classes["cate-item"]}>
            <NavLink
              to="./pasta"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <div className={classes["cate-item-wrapper"]}>
                <div className={classes["cate-title"]}>
                  <RamenDiningIcon />
                  <span>Pasta</span>
                </div>
                <div>(10)</div>
              </div>
            </NavLink>
          </li>
          <li className={classes["cate-item"]}>
            <NavLink
              to="./pizza"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <div className={classes["cate-item-wrapper"]}>
                <div className={classes["cate-title"]}>
                  <LocalPizzaIcon />
                  <span>Pizza</span>
                </div>
                <div>(10)</div>
              </div>
            </NavLink>
          </li>
          <li className={classes["cate-item"]}>
            <NavLink
              to="./other"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <div className={classes["cate-item-wrapper"]}>
                <div className={classes["cate-title"]}>
                  <FastfoodIcon />
                  <span>Khác</span>
                </div>
                <div>(10)</div>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={classes["search-wrapper"]}>
        <SearchBar onSubmit={handleSearch} placeholder="Tìm món..." />
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

  //Call search
  const handleSearch = (searchValue) => {
    console.log(searchValue);
  };

  if (isModal) {
    return (
      <Fragment>
        {createPortal(
          <Content
            handleSearch={handleSearch}
            bestDealContent={bestDealContent}
            isOpened={isOpened}
            onClose={onClose}
          ></Content>,
          document.getElementById("overlay-root")
        )}
      </Fragment>
    );
  }

  return (
    <Content
      handleSearch={handleSearch}
      bestDealContent={bestDealContent}
    ></Content>
  );
};

export default Categories;
