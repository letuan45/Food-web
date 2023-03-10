import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import classes from "./ShopPageMain.module.css";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import TuneIcon from "@mui/icons-material/Tune";

import CustomPagination from "../UI/Pagination/CustomPagination";
import FoodItem from "../FoodItem/Index";
import Categories from "./Categories";
import useViewport from "../../hooks/use-viewport";
import Backdrop from "../../components/UI/Modal/Backdrop";
import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import { useParams } from "react-router";
import { useNavigate, useLocation } from "react-router-dom";
import useWishlistTransform from "../../hooks/useWishlistTransform";

const ShopPageMain = () => {
  const [orderType, setOrderType] = useState(0);
  const [cateIsOpen, setCateIsOpen] = useState(false);
  const [resetPaginate, setResetPaginate] = useState(false);
  const { width: deviceWidth } = useViewport();
  let getItemsURL = "/items";
  const { pageNum } = useParams();
  getItemsURL += pageNum ? `/page/${pageNum}` : "";
  const { idType } = useParams();
  const { typeSort } = useParams();
  const { searchValue } = useParams();
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (deviceWidth > 1200) setCateIsOpen(false);
  }, [deviceWidth]);

  const handleResetOrderType = () => {
    setOrderType(0);
  };

  const {
    response: productsResponse,
    isLoading: productsIsLoading,
    error: productsError,
    refetch: reloadProducts,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getItemsURL,
    requestConfig: {
      params: {
        id_type: idType ? idType : "",
        typesort: typeSort ? typeSort : "",
        name: searchValue ? searchValue : "",
      },
    },
  });

  useEffect(() => {
    reloadProducts();
    if (typeSort) return;
    //set page b???ng 1
    setResetPaginate(true);
  }, [idType, reloadProducts, typeSort, searchValue]);

  let PRODUCTS = productsResponse ? productsResponse.itemList : [];
  PRODUCTS = useWishlistTransform(PRODUCTS);
  const totalItems = productsResponse ? productsResponse.totalItems : 0;
  let totalPage = 0;
  if (productsResponse) {
    let count = 0;
    const totalItems = productsResponse.totalItems;
    for (let i = totalItems; i > 0; i -= 12) {
      count++;
    }
    totalPage = count;
  }

  //Product list
  let productsContent;
  if (productsIsLoading) {
    productsContent = (
      <div className={classes["loading-wrapper"]}>
        <LoadingSpinner />
      </div>
    );
  } else if (!productsError && PRODUCTS && PRODUCTS.length === 0) {
    productsContent = (
      <p className={classes["product-list"]}>
        <RemoveShoppingCartIcon />
        R???t ti???c, kh??ng c?? b???t k?? m??n n??o.
      </p>
    );
  } else if (!productsError && PRODUCTS && PRODUCTS.length > 0) {
    productsContent = (
      <ul className={`${classes["product-list"]} row`}>
        {PRODUCTS.map((item) => (
          <FoodItem
            item={item}
            key={item["id_item"]}
            className="col-md-6 col-lg-4"
          />
        ))}
      </ul>
    );
  }

  //Events
  const handleOpenCate = () => {
    setCateIsOpen(true);
  };

  const handleChangeType = (newValue) => {
    setOrderType(() => newValue);
    if (+newValue === 0) return;
    let currenPath = location.pathname;
    let currenPathArr = currenPath.split("/");

    //T??m k?? t??? typesort trong path
    const typeSortCharIdx = currenPathArr.findIndex(
      (item) => item === "typesort"
    );
    //N???u t??m ra, thay th??? gi?? tr???
    if (typeSortCharIdx >= 0) {
      currenPathArr[typeSortCharIdx + 1] = newValue;
      currenPath = currenPathArr.join("/");
    } else {
      currenPath += `/typesort/${newValue}`;
    }

    navigate(currenPath);
  };

  const handleCloseCate = () => {
    setCateIsOpen(false);
  };

  const handleUnsetResetPaginate = () => {
    setResetPaginate(false);
  };

  const from = pageNum ? 1 + 12 * (pageNum - 1) : 1;
  const to = pageNum ? PRODUCTS.length + 12 * (pageNum - 1) : 12;

  return (
    <section className="shop-page">
      {cateIsOpen && <Backdrop onClose={handleCloseCate} />}
      <div className={classes["main-wrapper"]}>
        <Container>
          <Row>
            <Col xl={9}>
              <div className={classes["display-wrapper"]}>
                <div className={classes["display-result"]}>
                  <button
                    className={classes["open-cate"]}
                    onClick={handleOpenCate}
                  >
                    <TuneIcon />
                    Danh m???c
                  </button>
                  <div className={classes["cate-length"]}>
                    Hi???n th???
                    <span>
                      {" "}
                      {from}-{to}{" "}
                    </span>
                    Tr??n
                    <span> {totalItems} </span>
                    K???t qu???
                  </div>
                </div>
                <div className={classes["sort-wrapper"]}>
                  <form className={classes["sort-form"]} method="get">
                    <select
                      name="orderby"
                      value={orderType}
                      onChange={(event) => handleChangeType(event.target.value)}
                    >
                      <option value={0}>S???p x???p m???c ?????nh</option>
                      <option value={1}>S???p x???p ????? ph??? bi???n</option>
                      <option value={2}>S???p x???p gi?? gi???m d???n</option>
                      <option value={3}>S???p x???p gi?? t??ng d???n</option>
                    </select>
                    <ExpandMoreRoundedIcon className={classes.chevron} />
                  </form>
                </div>
              </div>
              {productsContent}
              <div className={classes["pagination-wrapper"]}>
                <CustomPagination
                  resetPaginate={resetPaginate}
                  unsetResetPaginate={handleUnsetResetPaginate}
                  count={totalPage}
                  type={idType}
                />
              </div>
            </Col>
            <Categories
              isModal={deviceWidth <= 1200}
              isOpened={cateIsOpen}
              onClose={handleCloseCate}
              onChange={handleResetOrderType}
            />
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default ShopPageMain;
