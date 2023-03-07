import { React, useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import RatingStars from "../UI/RatingStars/Index";
import { Link } from "react-router-dom";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import WishButton from "../UI/Button/WishButton";
// import RawMaterialFood from "./RawMaterialFood";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import httpClient from "../../utils/axiosInstance";
import Tabs from "./Tabs";
import QuantityControl from "./QuantityControl";
import { useSelector } from "react-redux";

const ProductDetail = (props) => {
  const { productId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [product, setProduct] = useState(null);
  const getItemURL = `/items/detail/${productId}`;
  const wishList = useSelector((state) => state.wishList.items);
  const user = useSelector((state) => state.auth.user);
  const { onChangeBreadcrumb } = props;

  const {
    response: productResponse,
    error: productError,
    isLoading: productIsLoading,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getItemURL,
  });

  useEffect(() => {
    if (product) {
      onChangeBreadcrumb({
        title: product.name,
        link: `/items/detail/${product["id_item"]}`,
      });
      return;
    }
    if (productResponse && productResponse.length > 0) {
      setProduct(productResponse.pop());
    }
  }, [productResponse, onChangeBreadcrumb, product]);

  //Xác định item đang like
  useEffect(() => {
    if (!user) return;
    const itemIsLiked =
      wishList.findIndex((item) => item["id_item"] === +productId) >= 0;
    setIsLiked(itemIsLiked);
  }, [user, wishList, productId]);

  if (!product || (productError && !productIsLoading)) {
    return <p className={classes["empty-rv"]}>Đã xảy ra lỗi</p>;
  }

  //Dữ liệu render
  const price = Number(product.price).toLocaleString("en");
  let status = "";
  if (product.status === 1) {
    status = "Còn hàng";
  } else if (product.status === 2) {
    status = "Hết hàng";
  } else {
    status = "Ngừng kinh doanh";
  }

  return (
    <section className="product-detail">
      <Container style={{ marginTop: "100px" }} fluid="lg">
        <Row
          style={{ margin: "0 -30px" }}
          className={classes["detail-wrapper"]}
        >
          <Col md={6} style={{ padding: "10px 30px" }}>
            <img
              className={classes["product-image"]}
              src={product.image}
              alt="ảnh sản phẩm"
              width="100%"
            ></img>
          </Col>
          <Col md={6} style={{ padding: "10px 30px" }}>
            <h1 className={classes["product-name"]}>{product.name}</h1>
            <p className={classes["product-stock"]}>Tồn: {product.quantity}</p>
            <p className={classes["product-status"]}>Trạng thái: {status}</p>
            <RatingStars rating={product.rating} />
            <p className={classes["product-description"]}>
              Nguyên liệu: {product.ingredient}
            </p>
            <h1 className={classes["price"]}>{price} VND</h1>
            <hr></hr>
            <div className={classes["control-wrapper"]}>
              <QuantityControl
                maxQuantity={product.quantity}
                product={product}
              />
              <div className={classes["wish-wrapper"]}>
                <WishButton item={product} isLiked={isLiked} />
              </div>
            </div>
            <hr style={{ marginBottom: "26px" }}></hr>
            <div className={classes["cate-and-social"]}>
              <div className={classes["link-item"]}>
                Loại món:{" "}
                <Link to={`/items/id_type/${product["id_type"]}`}>
                  {product["name_type"]}
                </Link>
              </div>
              <div className={classes["social-wrapper"]}>
                Chia sẻ:
                <Link to="/" className={classes["social-item"]}>
                  <FacebookIcon className={classes["icon-category"]} />
                </Link>
                <Link to="/" className={classes["social-item"]}>
                  <YouTubeIcon className={classes["icon-category"]} />
                </Link>
                <Link to="/" className={classes["social-item"]}>
                  <InstagramIcon className={classes["icon-category"]} />
                </Link>
                <Link to="/" className={classes["social-item"]}>
                  <TwitterIcon className={classes["icon-category"]} />
                </Link>
              </div>
            </div>
            <hr style={{ marginTop: "26px", marginBottom: "26px" }}></hr>
            <ul className={classes["note-content"]}>
              <li>Giao hàng nội thành TPHCM tối đa 1 giờ</li>
              <li>Sau khi tiếp nhận đơn hàng, chúng tôi sẽ liên lạc bạn</li>
              <li>Được kiểm tra và hoản trả lúc trao hàng</li>
            </ul>
            <hr style={{ marginTop: "26px", marginBottom: "26px" }}></hr>
            <div className={classes["checkout"]}>
              <h1
                style={{
                  color: "var(--text)",
                  fontWeight: "700",
                  marginBottom: "8px",
                }}
              >
                Sẵn sàng tiếp nhận thanh toán
              </h1>
              <img
                className={classes["image-pay"]}
                src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/trust-symbols.png"
                alt="ảnh sản phẩm"
              />
            </div>
          </Col>
        </Row>
        <Tabs description={product.description} productId={productId}/>
      </Container>
    </section>
  );
};
export default ProductDetail;
