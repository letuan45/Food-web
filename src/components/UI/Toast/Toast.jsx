import Alert from "@mui/material/Alert";
import { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Slide from "@mui/material/Slide";

const Toast = (props) => {
  const [isShown, setIsShown] = useState(true);

  const handleOnClose = () => {
    setIsShown(false);
  };

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
  }, []);

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
