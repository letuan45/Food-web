import { useFormik } from "formik";

import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import ReactDOM from "react-dom";
import { Fragment } from "react";

import classes from "./Authentication.module.css";
import LabledInput from "../../Input/LabledInput";
import Button from "../../Button/index";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const validateLogin = (values) => {
  const errors = {};

  if (!values.email || values.email.trim().length === 0) {
    errors.email = "Xin hãy nhập email !";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email không hợp lệ !";
  }

  if (!values.password || values.password.trim().length === 0) {
    errors.password = "Xin hãy nhập mật khẩu !";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
    errors.password = "Mật khẩu không hợp lệ !";
  }

  return errors;
};

const LoginForm = (props) => {
  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: (values, { resetForm }) => {
      resetForm();
    },
  });

  return (
    <form onSubmit={formikLogin.onSubmit}>
      <LabledInput
        name="email"
        label="Email"
        placeholder="Nhập Email"
        required={true}
        value={formikLogin.values.email}
        onChange={formikLogin.handleChange}
        onBlur={formikLogin.handleBlur}
        error={
          formikLogin.touched.email && formikLogin.errors.email
            ? formikLogin.errors.email
            : null
        }
      />
      <LabledInput
        name="password"
        label="Mật khẩu"
        placeholder="Nhập 8 kí tự có ít nhất 1 chữ cái viết hoa và 1 số"
        required={true}
        type="password"
        value={formikLogin.values.password}
        onChange={formikLogin.handleChange}
        onBlur={formikLogin.handleBlur}
        error={
          formikLogin.touched.password && formikLogin.errors.password
            ? formikLogin.errors.password
            : null
        }
      />
      <div className={classes.switch}>
        <p>Không có tài khoản ? Chuyển sang Đăng ký</p>
        <NavLink to="/register" onClick={props.onClose}>
          <Button>
            <KeyboardDoubleArrowRightIcon />
          </Button>
        </NavLink>
      </div>
      <Button type="submit">Đăng Nhập</Button>
    </form>
  );
};

const Authentication = (props) => {
  const authClasses = `${classes[`${props.className}`]} ${
    classes["auth-wrapper"]
  }`;

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={authClasses}>
          <div className={classes.wrapper}>
            <header className="my-3 d-flex justify-content-between">
              <h1 className={classes["form-header"]}>Đăng nhập</h1>
              <button onClick={props.onClose} className={classes.close}>
                <CloseIcon />
              </button>
            </header>
            <LoginForm onClose={props.onClose} />
          </div>
        </div>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Authentication;
