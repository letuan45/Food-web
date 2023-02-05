import Button from "../Button/index";
import classes from "./InputWithButton.module.css";

const InputWithButton = (props) => {
  return (
    <div className={classes.wrapper}>
      <form onSubmit={props.onSubmit}>
        <label htmlFor={props.id}>{props.label}</label>
        <input
          type={props.type ? props.type : 'text'}
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
        />
        <Button type="submit">Xác nhận</Button>
      </form>
    </div>
  );
};

export default InputWithButton;
