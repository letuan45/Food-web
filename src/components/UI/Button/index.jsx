import classes from "./index.module.css";

const index = (props) => {
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

export default index;
