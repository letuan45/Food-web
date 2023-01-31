import classes from "./SmallButton.module.css";

const SmallButton = (props) => {
  return (
    <button
      className={classes.btn}
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
    >
      {props.children}
    </button>
  );
};

export default SmallButton;
