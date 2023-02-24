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

const DUMMY_BEST = [
  {
    id: 1,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 0,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
  {
    id: 2,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 3.5,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
  {
    id: 3,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/53-1-600x600.png",
    rating: 4.5,
    name: "Tên món ăn",
    description: "Mô tả món ăn",
    price: "60000",
  },
];

const ShopPageMain = () => {
  const [orderType, setOrderType] = useState(0);
  const [cateIsOpen, setCateIsOpen] = useState(false);
  const [resetPaginate, setResetPaginate] = useState(false);
  const { width: deviceWidth } = useViewport();
  let getItemsURL = "/items";
  const { pageNum } = useParams();
  getItemsURL += pageNum ? `/${pageNum}` : "";
  const { idType } = useParams();
  const { typeSort } = useParams();
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
      },
    },
  });

  useEffect(() => {
    reloadProducts();
    if (typeSort) return;
    //set page bằng 1
    setResetPaginate(true);
  }, [idType, reloadProducts, typeSort]);

  let PRODUCTS = productsResponse ? productsResponse.itemList : [];
  PRODUCTS = useWishlistTransform(PRODUCTS);
  let totalPage = 0;
  if(productsResponse) {
    let count = 0;
    const totalItems = productsResponse.totalItems;
    for(let i = totalItems; i > 0; i-= 12) {
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
        Rất tiếc, không có bất kì món nào.
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

    //Tìm kí tự typesort trong path
    const typeSortCharIdx = currenPathArr.findIndex(
      (item) => item === "typesort"
    );
    //Nếu tìm ra, thay thế giá trị
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
                    Danh mục
                  </button>
                  <div className={classes["cate-length"]}>
                    Hiển thị
                    <span> 1-12 </span>
                    Trên
                    <span> 54 </span>
                    Kết quả
                  </div>
                </div>
                <div className={classes["sort-wrapper"]}>
                  <form className={classes["sort-form"]} method="get">
                    <select
                      name="orderby"
                      value={orderType}
                      onChange={(event) => handleChangeType(event.target.value)}
                    >
                      <option value={0}>Sắp xếp mặc định</option>
                      <option value={1}>Sắp xếp độ phổ biến</option>
                      <option value={2}>Sắp xếp giá giảm dần</option>
                      <option value={3}>Sắp xếp giá tăng dần</option>
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
              bestProduct={DUMMY_BEST}
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
