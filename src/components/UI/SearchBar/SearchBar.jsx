import classes from "./SearchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import SearchList from "./SearchList";
import httpClient from "../../../utils/axiosInstance";
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const SearchBar = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const getItemsURL = "/items";
  const {
    response: searchRes,
    loading: searchIsLoading,
    axiosFetch: callSearch,
  } = useAxiosFunction();

  const handleSubmit = () => {
    if (searchValue.length === 0) return;
    props.onSubmit(searchValue);
  };

  //Search
  const handleValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue.length === 0) {
      setSearchedItems([]);
      return;
    };
    callSearch({
      axiosInstance: httpClient,
      method: "GET",
      url: getItemsURL,
      requestConfig: {
        params: {
          name: searchValue,
        },
      },
    });
  }, [searchValue, callSearch]);

  useEffect(() => {
    if (isFocused === false) {
      setSearchedItems([]);
      return;
    }
    if (searchRes) {
      setSearchedItems(searchRes.itemList.slice(0, 5));
    }
  }, [searchRes, isFocused]);

  return (
    <form onSubmit={handleSubmit} className={classes["control-form"]}>
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={handleValueChange}
        onFocus={() => {
          setIsFocused(true);
        }}
      />
      <button type="submit">
        {searchIsLoading ? <LoadingSpinner /> : <SearchIcon />}
      </button>
      <SearchList items={searchedItems} />
    </form>
  );
};

export default SearchBar;
