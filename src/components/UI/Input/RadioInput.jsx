import React from "react";
import classes from "./RadioInput.module.css";

const RadioInput = (props) => {
  return (
    <div className={classes.wrapper}>
      <input
        defaultChecked={props.defaultChecked}
        type="radio"
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default RadioInput;
