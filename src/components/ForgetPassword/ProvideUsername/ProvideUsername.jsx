import React, { useEffect, useState } from "react";
import classes from "./ProvideUsername.module.css";
import LabledInput from "../../UI/Input/LabledInput";
import { useFormik } from "formik";
import SmallButton from "../../UI/Button/SmallButton";
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import { useDispatch } from "react-redux";
import { toastAction } from "../../../store";
import httpClient from "../../../utils/axiosInstance";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

const URL = "account/forgotpassword";

const validateUserName = (values) => {
  const errors = {};

  if (!values.username || values.username.trim().length === 0) {
    errors.username = "Xin hãy nhập username !";
  } else if (!/^[a-z0-9]+$/.test(values.username)) {
    errors.username = "Username không hợp lệ !";
  }

  return errors;
};

const ProvideUsername = (props) => {
  const dispatch = useDispatch();
  const { onToNextStep, onChangeMessage, onChangeUsername } = props;
  const [username, setUsername] = useState("");
  const {
    response: provideUsernameRes,
    error: provideErr,
    loading: provideIsLoading,
    axiosFetch: provideAction,
  } = useAxiosFunction();

  useEffect(() => {
    if (provideUsernameRes) {
      onChangeMessage(provideUsernameRes.message);
      onChangeUsername(username);
      onToNextStep();
    } else if (provideErr) {
      dispatch(
        toastAction.showToast({
          message: provideErr.data.message,
          type: "error",
        })
      );
    }
  }, [
    provideUsernameRes,
    provideErr,
    onToNextStep,
    dispatch,
    onChangeMessage,
    onChangeUsername,
    username,
  ]);

  const formikLogin = useFormik({
    initialValues: {
      username: "",
    },
    validate: validateUserName,
    onSubmit: (values) => {
      //Sự kiện submit
      provideAction({
        axiosInstance: httpClient,
        method: "POST",
        url: URL,
        requestConfig: {
          data: values,
        },
      });
      setUsername(values.username);
    },
  });

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Tài khoản</h2>
      <h3 className={classes.header}>
        Hãy cung cấp tài khoản đăng nhập của bạn !
      </h3>
      <form onSubmit={formikLogin.handleSubmit}>
        <LabledInput
          name="username"
          label="Username"
          placeholder="Nhập tên tài khoản"
          required={true}
          value={formikLogin.values.username}
          onChange={formikLogin.handleChange}
          onBlur={formikLogin.handleBlur}
          error={
            formikLogin.touched.username && formikLogin.errors.username
              ? formikLogin.errors.username
              : null
          }
        />
        <div className={classes["btn-group"]}>
          <SmallButton type="submit">
            {provideIsLoading && <LoadingSpinner />}
            {!provideIsLoading && "Tiếp theo"}
          </SmallButton>
        </div>
      </form>
    </div>
  );
};

export default ProvideUsername;
