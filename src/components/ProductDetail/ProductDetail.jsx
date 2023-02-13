  import { React } from "react";
  import classes from "./ProductDetail.module.css";
  import RatingStars from "../UI/RatingStars/Index";
  import { Link } from "react-router-dom";
  import TwitterIcon from "@mui/icons-material/Twitter";
  import FacebookIcon from "@mui/icons-material/Facebook";
  import YouTubeIcon from "@mui/icons-material/YouTube";
  import InstagramIcon from "@mui/icons-material/Instagram";
  import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
  import WishButton from "../UI/Button/WishButton";
  import { useState } from "react";
  // import RawMaterialFood from "./RawMaterialFood";
  import Container from "react-bootstrap/Container";
  import Row from "react-bootstrap/Row";
  import Col from "react-bootstrap/Col";
  import Button from "../../components/UI/Button";
  import AddIcon from "@mui/icons-material/Add";
  import RemoveIcon from "@mui/icons-material/Remove";
  import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";

  const productItem = {
    id: 1,
    name: "Trà chanh",
    description:
      "Mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả",
    price: 30000,
    rating: 4.5,
    type: "Đồ uống",
  };

  const DUMMY_REVIEW = [
    {
      id: 1,
      userName: "Tuấn",
      rating: 5,
      comment:
        "I am 6 feet tall and 220 lbs. This shirt fit me perfectly in the chest and shoulders. My only complaint is that it is so long! I like to wear polo shirts untucked. This shirt goes completely past my rear end. If I wore it with ordinary shorts, you probably wouldnt be able to see the shorts at all – completely hidden by the shirt. It needs to be 4 to 5 inches shorter in terms of length to suit me. I have many RL polo shirts, and this one is by far the longest. I dont understand why.",
      date: new Date(),
    },
    {
      id: 2,
      userName: "Tuấn Lê",
      rating: 1,
      comment: "Vị như đuồi bầu",
      date: new Date(),
    },
  ];

  const ProductDetail = () => {
    const [tabState, setTabState] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const price = Number(productItem.price).toLocaleString("en");

    const toggleTab = (state) => {
      setTabState(state);
    };

    const increaseQuantityHandler = (event) => {
      event.preventDefault();

      setQuantity((state) => state + 1);
    };

    const decreaseQuantityHandler = (event) => {
      event.preventDefault();

      if (quantity - 1 <= 0) return;
      setQuantity((state) => state - 1);
    };

    const handleQuantityChange = (value) => {
      if (value <= 0) return;
      setQuantity(value);
    };

    let reviewList = (
      <p className={classes["empty-rv"]}>Không có đánh giá nào cho món này.</p>
    );

    if (DUMMY_REVIEW || DUMMY_REVIEW.length > 0) {
      reviewList = DUMMY_REVIEW.map((item) => (
        <ReviewItem item={item} key={item.id} />
      ));
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
                src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/24-1.png"
                alt="ảnh sản phẩm"
                width="100%"
              ></img>
            </Col>
            <Col md={6} style={{ padding: "10px 30px" }}>
              <h1 className={classes["product-name"]}>{productItem.name}</h1>
              <p className={classes["product-stock"]}>Tồn: 18</p>
              <RatingStars rating={productItem.rating} />
              <p className={classes["product-description"]}>
                {/* Chổ này nên là nguyên liệu */}
                Nguyên liệu
              </p>
              <h1 className={classes["price"]}>{price} VND</h1>
              <hr></hr>
              <div className={classes["control-wrapper"]}>
                <div className={classes["quantity-control"]}>
                  <button onClick={decreaseQuantityHandler}>
                    <RemoveIcon />
                  </button>
                  <input value={quantity} onChange={handleQuantityChange} />
                  <button onClick={increaseQuantityHandler}>
                    <AddIcon />
                  </button>
                </div>
                <Link to={`/add-to-cart/${productItem.id}`}>
                  <Button>
                    <ShoppingBasketIcon
                      style={{ marginRight: "8px" }}
                      className={classes["icon-add"]}
                    ></ShoppingBasketIcon>
                    Thêm vào giỏ hàng
                  </Button>
                </Link>
                <div className={classes["wish-wrapper"]}>
                  <WishButton itemId={productItem.id} />
                </div>
              </div>
              <hr style={{ marginBottom: "26px" }}></hr>
              <div className={classes["cate-and-social"]}>
                <div className={classes["link-item"]}>
                  Loại món: <Link to="/">Pasta</Link>
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
          <div className={classes.description}>
            <div className={classes["tabs-buttons-wrapper"]}>
              <Row style={{ margin: "0 -30px", flexWrap: "nowrap" }}>
                <Col 
                  style={{
                    padding: "10px 30px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className={
                      tabState === 1 ? classes["button-active"] : classes[""]
                    }
                    onClick={() => toggleTab(1)}
                  >
                    Mô tả
                  </button>
                </Col>
                <Col
                  style={{
                    padding: "10px 30px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className={
                      tabState === 2 ? classes["button-active"] : classes[""]
                    }
                    onClick={() => toggleTab(2)}
                  >
                    Review (14)
                  </button>
                </Col>
              </Row>
            </div>
            <div className={classes["tabs-content-wrapper"]}>
              {tabState === 1 && (
                <p className={classes["desc-content"]}>
                  {productItem.description}
                </p>
              )}
              {tabState === 2 && (
                <Row style={{ margin: "0 -30px" }}>
                  <Col md={6} style={{ padding: "10px 30px" }}>
                    {reviewList}
                  </Col>
                  <Col md={6} style={{ padding: "10px 30px" }}>
                    <ReviewForm/>
                  </Col>
                </Row>
              )}
            </div>
          </div>
        </Container>
      </section>
    );
  };
  export default ProductDetail;
