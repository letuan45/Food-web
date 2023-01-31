import classes from "./MenuButton.module.css";

const MenuButton = (props) => {
  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.icon}
      {props.quantity ? <div className={classes.quantity}>{props.quantity}</div> : null}
    </button>
  );
};

export default MenuButton;
