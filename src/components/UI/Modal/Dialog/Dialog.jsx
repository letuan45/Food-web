import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Dialog.module.css";
import Button from "../../../UI/Button";

const Dialog = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classes.wrapper}>
          <div className={classes.header}>{props.header}</div>
          <div className={classes.content}>{props.content}</div>
          <div className={classes["controls"]}>
            <Button onClick={props.onSubmit}>{props.yes}</Button>
            <Button onClick={props.onClose}>{props.no}</Button>
          </div>
        </div>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Dialog;
