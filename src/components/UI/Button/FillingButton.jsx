import classes from "./FillingButton.module.css";

const FillingButton = (props) => {
  return (
    <button style={props.style} className={classes.btn} onClick={props.onClick}>
      <span>{props.children}</span>
    </button>
  );
};

export default FillingButton;
