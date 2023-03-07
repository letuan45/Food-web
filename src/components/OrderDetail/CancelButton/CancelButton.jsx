import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./CancelButton.module.css";
import Backdrop from "../../UI/Modal/Backdrop";
import Dialog from "../../UI/Modal/Dialog/Dialog";
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import httpClient from "../../../utils/axiosInstance";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import { toastAction } from "../../../store";

const CancelButton = (props) => {
  const dispatch = useDispatch();
  const { itemId, cancelOrder } = props;
  const { orderStatus } = props;
  const cancelURL = `/orders/cancel/${itemId}`;
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const {
    response: cancelResponse,
    error: cancelError,
    loading: cancelIsLoading,
    axiosFetch: callCancelOrder,
  } = useAxiosFunction();

  const closeBackdropHandler = () => {
    setDialogIsOpen(false);
  };

  const handleOpenDialog = () => {
    setDialogIsOpen(true);
  };

  const cancelOrderHandler = () => {
    setDialogIsOpen(false);

    callCancelOrder({
      axiosInstance: httpClient,
      method: "GET",
      url: cancelURL
    })
  };

  useEffect(() => {
    if(cancelError) {
      dispatch(
        toastAction.showToast({
          message: cancelError.data.message,
          type: "error",
        })
      );
      return;
    }
    if(cancelResponse) {
      dispatch(
        toastAction.showToast({
          message: cancelResponse.message,
          type: "success",
        })
      );
      //Hủy đơn hàng trên giao diện
      cancelOrder();
    }
  }, [cancelResponse, cancelError, dispatch, cancelOrder]);

  return (
    <Fragment>
      {dialogIsOpen ? <Backdrop onClose={closeBackdropHandler} /> : null}
      {dialogIsOpen ? (
        <Dialog
          header="Thông báo"
          content={`Bạn có chắc chắn muốn hủy đơn hàng #${itemId} ?`}
          onClose={closeBackdropHandler}
          onSubmit={cancelOrderHandler}
          yes={cancelIsLoading ? <LoadingSpinner /> : "Có"}
          no="Không"
        />
      ) : null}
      <button
        className={`${classes["cancel-btn"]} ${
          +orderStatus !== 0 ? classes.disabled : ""
        }`}
        onClick={handleOpenDialog}
      >
        Hủy đơn
      </button>
    </Fragment>
  );
};

export default CancelButton;
