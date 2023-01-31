import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Backdrop.module.css"

const BackdropContent = (props) => {
  return (
    <div
      className={`${classes.backdrop} ${classes[`${props.className}`]}`}
      onClick={props.onClose}
    />
  );
};

const Backdrop = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackdropContent onClose={props.onClose} className={props.className} />,
        document.getElementById("backdrop-root")
      )}
    </Fragment>
  );
};

export default Backdrop;
