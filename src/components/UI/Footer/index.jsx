import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import classes from "./index.module.css";
import logo from "../../../assets/images/logo.png";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

import { Link } from "react-router-dom";
import InputWithButton from "../Input/InputWithButton";

const index = () => {
  return (
    <section className="footer" style={{ backgroundColor: "#181818" }}>
      <div></div>
      <div className={classes["header-logo"]}>
        <div className={classes["container-logo"]}>
          <div className={classes.logo}>
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
      <Container>
        <Row>
          <Col lg={3} md={6} style={{ padding: "12px" }}>
            <div className={classes["content-item"]}>
              <h2 className={classes["header-content-item"]}>Địa chỉ</h2>
              <p>97 Man Thiện</p>
              <p>"Thành phố HCM"</p>
              <p>Việt Nam</p>
            </div>
          </Col>
          <Col lg={3} md={6} style={{ padding: "12px" }}>
            <div className={classes["content-item"]}>
              <h2 className={classes["header-content-item"]}>Đặt bàn</h2>
              <p>Liên hệ trực tiếp với chúng tôi.</p>
              <p>Qua đường dây nóng</p>
              <h3 className={classes["addition-item"]}>(850) 435-4155</h3>
            </div>
          </Col>
          <Col lg={3} md={6} style={{ padding: "12px" }}>
            <div className={classes["content-item"]}>
              <h2 className={classes["header-content-item"]}>Giờ mở cửa</h2>
              <p>Các ngày trong tuần: 8am - 20pm</p>
              <p>Thứ bảy - Chủ nhật: 9am - 21pm</p>
              <ul className={classes["addition-item"]}>
                <li className={classes["addition-list_item"]}>
                  <Link to="#" className={classes["addition-linker"]}>
                    <FacebookRoundedIcon />
                  </Link>
                </li>
                <li className={classes["addition-list_item"]}>
                  <Link to="#" className={classes["addition-linker"]}>
                    <TwitterIcon />
                  </Link>
                </li>
                <li className={classes["addition-list_item"]}>
                  <Link to="#" className={classes["addition-linker"]}>
                    <YouTubeIcon />
                  </Link>
                </li>
                <li className={classes["addition-list_item"]}>
                  <Link to="#" className={classes["addition-linker"]}>
                    <InstagramIcon />
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={3} md={6} style={{ padding: "12px" }}>
            <div className={classes["content-item"]}>
              <h2 className={classes["header-content-item"]}>Hòm thư</h2>
              <p>Subscribe chúng tôi để nhận được </p>
              <p>những thông báo mới nhất</p>
              <div className={classes["addition-item"]}>
                <InputWithButton
                  type="email"
                  id="email-user"
                  placeholder="Nhập Email..."
                ></InputWithButton>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className={classes["introduce-item"]}>
        <div className={classes["introduce-item_1"]}>
          <p>
            Copyright © 2022 <Link to="" className={classes["linker-home"]}>Pocofood.</Link> All Rights Reserved.
          </p>
        </div>
        <div className={classes["introduce-item_2"]}>
          <img
            className={classes["introduce-img"]}
            src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/footer_img1.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default index;
