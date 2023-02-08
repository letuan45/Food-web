import classes from "./SearchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useRef } from "react";

const SearchBar = (props) => {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (inputRef.length === 0) return;
    props.onSubmit(inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit} className={classes["control-form"]}>
      <input type="text" placeholder={props.placeholder} ref={inputRef} />
      <button type="submit">
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
