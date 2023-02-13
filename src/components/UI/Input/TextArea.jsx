import React from "react";
import classes from "./TextArea.module.css";

const TextArea = React.forwardRef((props, ref) => {
  return (
    <React.Fragment>
      <label className={classes["control-label"]} htmlFor={props.name}>
        {props.label} <span>{props.isRequired ? "*" : ""}</span>
      </label>
      <textarea
        ref={ref}
        id={props.name}
        name={props.name}
        cols={props.cols}
        rows={props.rows}
        className={classes.text}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      ></textarea>
    </React.Fragment>
  );
});

export default TextArea;
