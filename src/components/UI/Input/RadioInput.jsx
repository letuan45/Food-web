import React from "react";
import classes from "./RadioInput.module.css";

const RadioInput = (props) => {
  const handleOnChangeMethod = () => {
    props.onChange(props.value);
  }

  return (
    <div className={classes.wrapper}>
      <input
        defaultChecked={props.value === 1}
        type="radio"
        id={props.id}
        name={props.name}
        value={props.value}
        onClick={handleOnChangeMethod}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default RadioInput;
