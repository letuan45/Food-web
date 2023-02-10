import CircularProgress from "@mui/material/CircularProgress";
import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return <CircularProgress className={classes.item} />;
};

export default LoadingSpinner;
