import React, { useEffect } from "react";
import classes from "./ChangePassword.module.css";
import LabledInput from "../../UI/Input/LabledInput";
import { useFormik } from "formik";
import SmallButton from "../../UI/Button/SmallButton";
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import { useDispatch } from "react-redux";
import { toastAction } from "../../../store";
import httpClient from "../../../utils/axiosInstance";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

const URL = "account/forgotpassword/verify/success";

const validateUserName = (values) => {
  const errors = {};

  if (!values.password || values.password.trim().length === 0) {
    errors.password = "Xin hãy nhập mật khẩu !";
  }

  if (!values.repeatPassword || values.repeatPassword.trim().length === 0) {
    errors.repeatPassword = "Xin hãy nhập lại mật khẩu !";
  }

  return errors;
};

const ChangePassword = (props) => {
  const { onToNextStep, username } = props;
  const dispatch = useDispatch();
  const {
    response: changePassRes,
    error: changePassErr,
    loading: changePassIsLoading,
    axiosFetch: changePassAction,
  } = useAxiosFunction();

  useEffect(() => {
    if (changePassRes) {
      onToNextStep();
    } else if (changePassErr) {
      dispatch(
        toastAction.showToast({
          message: changePassErr.data.message,
          type: "error",
        })
      );
    }
  }, [changePassRes, changePassErr, onToNextStep, dispatch]);

  const formikLogin = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validate: validateUserName,
    onSubmit: (values) => {
      //Sự kiện submit
      changePassAction({
        axiosInstance: httpClient,
        method: "POST",
        url: URL,
        requestConfig: {
          data: { username: username, ...values },
        },
      });
    },
  });

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Đổi mật khẩu</h2>
      <h3 className={classes.header}>Hãy cung cấp mật khẩu mới của bạn</h3>
      <form onSubmit={formikLogin.handleSubmit}>
        <LabledInput
          name="password"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
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
        <LabledInput
          name="repeatPassword"
          label="Mật khẩu (nhập lại)"
          placeholder="Nhập lại mật khẩu"
          required={true}
          type="password"
          value={formikLogin.values.repeatPassword}
          onChange={formikLogin.handleChange}
          onBlur={formikLogin.handleBlur}
          error={
            formikLogin.touched.repeatPassword &&
            formikLogin.errors.repeatPassword
              ? formikLogin.errors.repeatPassword
              : null
          }
        />
        <div className={classes["btn-group"]}>
          <SmallButton type="submit">
            {changePassIsLoading && <LoadingSpinner />}
            {!changePassIsLoading && "Tiếp theo"}
          </SmallButton>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
