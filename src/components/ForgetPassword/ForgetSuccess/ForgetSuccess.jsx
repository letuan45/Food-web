import React from "react";
import classes from "./ForgetSuccess.module.css";
import done from "../../../assets/images/done.png";
import SmallButton from "../../UI/Button/SmallButton";
import { Link } from "react-router-dom";

const ForgetSuccess = (props) => {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Hoàn tất</h2>
      <h3 className={classes.header}>Quá trình lấy lại mật khẩu đã hoàn tất</h3>
      <img src={done} alt="hoan tat" className={classes["done-image"]} />
      <Link to="/">
        <SmallButton>Quay lại trang chủ</SmallButton>
      </Link>
    </div>
  );
};

export default ForgetSuccess;
