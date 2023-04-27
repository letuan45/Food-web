import React, { useEffect } from "react";
import classes from "./ProvideCode.module.css";
import LabledInput from "../../UI/Input/LabledInput";
import { useFormik } from "formik";
import SmallButton from "../../UI/Button/SmallButton";
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import { useDispatch } from "react-redux";
import { toastAction } from "../../../store";
import httpClient from "../../../utils/axiosInstance";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

const URL = "account/forgotpassword/verify";

const validateVerify = (values) => {
  const errors = {};

  if (!values.verifyID || values.verifyID.trim().length === 0) {
    errors.verifyID = "Xin hãy nhập mã xác nhận !";
  }

  return errors;
};

const ProvideCode = (props) => {
  const dispatch = useDispatch();
  const { onToNextStep, message, username } = props;
  const {
    response: provideCodeRes,
    error: provideErr,
    loading: provideCodeIsLoading,
    axiosFetch: provideCodeAction,
  } = useAxiosFunction();

  useEffect(() => {
    if (provideCodeRes) {
      onToNextStep();
    } else if (provideErr) {
      dispatch(
        toastAction.showToast({
          message: provideErr.data.message,
          type: "error",
        })
      );
    }
  }, [provideCodeRes, provideErr, onToNextStep, dispatch]);

  const formikLogin = useFormik({
    initialValues: {
      verifyID: "",
    },
    validate: validateVerify,
    onSubmit: (values) => {
      //Sự kiện submit
      provideCodeAction({
        axiosInstance: httpClient,
        method: "POST",
        url: URL,
        requestConfig: {
          data: {username: username, ...values},
        },
      });
    },
  });

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Xác minh</h2>
      <h3 className={classes.header}>{message}</h3>
      <form onSubmit={formikLogin.handleSubmit}>
        <LabledInput
          name="verifyID"
          label="Mã xác nhận"
          placeholder="Nhập mã xác nhận"
          required={true}
          value={formikLogin.values.verifyID}
          onChange={formikLogin.handleChange}
          onBlur={formikLogin.handleBlur}
          error={
            formikLogin.touched.verifyID && formikLogin.errors.verifyID
              ? formikLogin.errors.verifyID
              : null
          }
        />
        <div className={classes["btn-group"]}>
          <SmallButton type="submit">
            {provideCodeIsLoading && <LoadingSpinner />}
            {!provideCodeIsLoading && "Tiếp theo"}
          </SmallButton>
        </div>
      </form>
    </div>
  );
};

export default ProvideCode;
