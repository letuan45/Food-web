import classes from "./LabledInput.module.css";

const LabledInput = (props) => {
  return (
    <div className={classes.wrapper}>
      <label htmlFor={props.name} className={classes["control-label"]}>
        {props.label}
        {props.required && <span className={classes.required}>*</span>}
        {props.error && <span className={classes.error}>({props.error})</span>}
      </label>
      <input
        className={classes["control-input"]}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default LabledInput;
