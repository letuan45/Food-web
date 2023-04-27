import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import ReactDOM from "react-dom";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./ChangePassword.module.css";
import LabledInput from "../../Input/LabledInput";
import Button from "../../Button/index";
import useAxiosFunction from "../../../../hooks/useAxiosFunction";
import httpClient from "../../../../utils/axiosInstance";
import { toastAction } from "../../../../store";

import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const validateForgetPass = (values) => {
  const errors = {};

  if (!values.oldPassword || values.oldPassword.trim().length === 0) {
    errors.oldPassword = "Xin hãy nhập mật khẩu cũ!";
  }

  if (!values.newPassword || values.newPassword.trim().length === 0) {
    errors.newPassword = "Xin hãy nhập mật khẩu mới!";
  }

  if (!values.repeatPassword || values.repeatPassword.trim().length === 0) {
    errors.repeatPassword = "Xin hãy nhập lại mật khẩu mới!";
  }

  return errors;
};

const changePassURL = "/account/changepassword";

const ChangePasswordForm = (props) => {
  const dispatch = useDispatch();
  const { onClose } = props;

  const {
    response: changePassResponse,
    isLoading: changePassIsLoading,
    error: changePassError,
    axiosFetch: changePassAction,
  } = useAxiosFunction();

  useEffect(() => {
    if (changePassResponse) {
      dispatch(
        toastAction.showToast({
          message: changePassResponse.message,
          type: "success",
        })
      );
      onClose();
    } else if (changePassError) {
      dispatch(
        toastAction.showToast({
          message: changePassError.data.message,
          type: "error",
        })
      );
    }
  }, [changePassResponse, changePassError, onClose, dispatch]);

  const formikChangePass = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
    validate: validateForgetPass,
    onSubmit: (values, { resetForm }) => {
      //Sự kiện submit
      changePassAction({
        axiosInstance: httpClient,
        method: "PUT",
        url: changePassURL,
        requestConfig: {
          data: values,
        },
      });

      resetForm();
    },
  });


  return (
    <form onSubmit={formikChangePass.handleSubmit}>
      <LabledInput
        name="oldPassword"
        label="Mật khẩu hiện tại"
        type="password"
        placeholder="Nhập mật khẩu hiện tại"
        required={true}
        value={formikChangePass.values.oldPassword}
        onChange={formikChangePass.handleChange}
        onBlur={formikChangePass.handleBlur}
        error={
          formikChangePass.touched.oldPassword &&
          formikChangePass.errors.oldPassword
            ? formikChangePass.errors.oldPassword
            : null
        }
      />
      <LabledInput
        name="newPassword"
        label="Mật khẩu mới"
        placeholder="Nhập mật khẩu mới"
        required={true}
        type="password"
        value={formikChangePass.values.newPassword}
        onChange={formikChangePass.handleChange}
        onBlur={formikChangePass.handleBlur}
        error={
          formikChangePass.touched.newPassword &&
          formikChangePass.errors.newPassword
            ? formikChangePass.errors.newPassword
            : null
        }
      />
      <LabledInput
        name="repeatPassword"
        label="Mật khẩu mới (nhập lại)"
        placeholder="Nhập lại mật khẩu mới"
        required={true}
        type="password"
        value={formikChangePass.values.repeatPassword}
        onChange={formikChangePass.handleChange}
        onBlur={formikChangePass.handleBlur}
        error={
          formikChangePass.touched.repeatPassword &&
          formikChangePass.errors.repeatPassword
            ? formikChangePass.errors.repeatPassword
            : null
        }
      />
      <div
        className={`${classes["submit-btn"]} ${
          changePassIsLoading ? classes.disable : ""
        }`}
      >
        <Button type="submit">
          {changePassIsLoading ? <LoadingSpinner /> : "Xác nhận"}
        </Button>
      </div>
    </form>
  );
};

const ChangePassword = (props) => {
  const authClasses = `${classes[`${props.className}`]} ${
    classes["auth-wrapper"]
  }`;

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={authClasses}>
          <div className={classes.wrapper}>
            <header className="my-3 d-flex justify-content-between">
              <h1 className={classes["form-header"]}>Đổi mật khẩu</h1>
              <button onClick={props.onClose} className={classes.close}>
                <CloseIcon />
              </button>
            </header>
            <ChangePasswordForm onClose={props.onClose}/>
          </div>
        </div>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ChangePassword;
