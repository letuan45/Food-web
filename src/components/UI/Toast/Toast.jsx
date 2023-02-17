import Alert from "@mui/material/Alert";
import { Fragment, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import Slide from "@mui/material/Slide";

import { useDispatch } from "react-redux";
import { toastAction } from "../../../store";
import { useSelector } from "react-redux";

const Toast = (props) => {
  const dispatch = useDispatch();
  const isShown = useSelector((state) => state.toast.isShown);

  const handleOnClose = useCallback(() => {
    dispatch(toastAction.closeToast());
  }, [dispatch]);

  useEffect(() => {
    const closeTimer = () => {
      setTimeout(() => {
        handleOnClose();
      }, 4000);
    };

    closeTimer();

    return () => {
      clearTimeout(closeTimer);
    };
  }, [handleOnClose]);

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Slide in={isShown} direction="left">
          <Alert variant="filled" severity={props.type} onClose={handleOnClose}>
            {props.children}
          </Alert>
        </Slide>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Toast;
