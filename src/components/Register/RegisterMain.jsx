import { Fragment } from "react";
import { useFormik } from "formik";

import LabledInput from "../../components/UI/Input/LabledInput";
import Button from "../../components/UI/Button/SmallButton";
import BreadCrumbs from "../../components/UI/BreadCrumbs";

import background from "../../assets/images/backgrounds/breadcrumb.jpg";
import classes from "./RegisterMain.module.css"

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
  if (!values.name || values.name.trim().length === 0) {
    errors.name = "Xin hãy nhập tên của bạn !";
  } else if (!/^(?:[A-Za-z]+ )+[A-Za-z]+$/.test(values.name)) {
    errors.name = "Tên không hợp lệ !";
  }
  if (!values.username || values.username.trim().length === 0) {
    errors.username = "Xin hãy nhập username của bạn !";
  } else if (!/^[A-Za-z]+$/.test(values.username)) {
    errors.username = "Tên không hợp lệ !";
  }
  if (!values.phone || values.phone.trim().length === 0) {
    errors.phone = "Xin hãy nhập số điện thoại của bạn !";
  } else if (
    !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(values.phone)
  ) {
    errors.phone = "số điện thoại không hợp lệ !";
  }
  if (!values.address || values.address.trim().length === 0) {
    errors.address = "Xin hãy nhập địa chỉ của bạn !";
  } else if (!/[,#-/\s!@$.....]/.test(values.address)) {
    errors.address = "địa chỉ không hợp lệ !";
  }
  if (values.checkpassword !== values.password) {
    errors.checkpassword = "Mật khẩu không trùng khớp !";
  }

  return errors;
};

const RegisterMain = () => {
  const formikRegister = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      username: "",
      phone: "",
      address: "",
      checkpassword: "",
    },
    validate: validateLogin,
    onSubmit: (values, { resetForm }) => {
      console.log("vao dk ");
      resetForm();
    },
  });

  return (
    <Fragment>
      <BreadCrumbs background={background} registerBreadcrumbs={true}/>
      <div className="container " style={{ marginTop: "80px", marginBottom: "80px"}}>
        <form onSubmit={formikRegister.onSubmit} className={classes.form}>
          <LabledInput
            name="username"
            label="Username"
            placeholder="Nhập username"
            required={true}
            value={formikRegister.values.username}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            error={
              formikRegister.touched.username && formikRegister.errors.username
                ? formikRegister.errors.username
                : null
            }
          />
          <LabledInput
            name="email"
            label="Email"
            placeholder="Nhập Email"
            required={true}
            value={formikRegister.values.email}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            error={
              formikRegister.touched.email && formikRegister.errors.email
                ? formikRegister.errors.email
                : null
            }
          />
          <LabledInput
            name="password"
            label="Mật khẩu"
            placeholder="Nhập 8 kí tự có ít nhất 1 chữ cái viết hoa và 1 số"
            required={true}
            type="password"
            value={formikRegister.values.password}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            error={
              formikRegister.touched.password && formikRegister.errors.password
                ? formikRegister.errors.password
                : null
            }
          />
          <LabledInput
            name="checkpassword"
            label="Nhập lại Mật khẩu"
            placeholder="Nhập 8 kí tự có ít nhất 1 chữ cái viết hoa và 1 số"
            required={true}
            type="password"
            value={formikRegister.values.checkpassword}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            error={
              formikRegister.touched.checkpassword &&
              formikRegister.errors.checkpassword
                ? formikRegister.errors.checkpassword
                : null
            }
          />
          <LabledInput
            name="name"
            label="Họ tên của bạn"
            placeholder="Nhập họ tên của bạn"
            required={true}
            value={formikRegister.values.name}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            error={
              formikRegister.touched.name && formikRegister.errors.name
                ? formikRegister.errors.name
                : null
            }
          />
          <LabledInput
            name="phone"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại của bạn"
            required={true}
            value={formikRegister.values.phone}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            error={
              formikRegister.touched.phone && formikRegister.errors.phone
                ? formikRegister.errors.phone
                : null
            }
          />
          <LabledInput
            name="address"
            label="Địa chỉ"
            placeholder="Nhập địa chỉ của bạn"
            required={true}
            value={formikRegister.values.address}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            error={
              formikRegister.touched.address && formikRegister.errors.address
                ? formikRegister.errors.address
                : null
            }
          />
          <Button type="submit">Đăng Ký</Button>
        </form>
      </div>
    </Fragment>
  );
};

export default RegisterMain;
