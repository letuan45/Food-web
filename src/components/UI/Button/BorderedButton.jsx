import classes from "./BorderedButton.module.css";

const BorderedButton = (props) => {
  return (
    <button
      className={classes.btn}
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
    >
      {props.children}
    </button>
  );
}

export default BorderedButton