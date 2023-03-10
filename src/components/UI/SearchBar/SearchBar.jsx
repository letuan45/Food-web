import classes from "./SearchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import SearchList from "./SearchList";
import httpClient from "../../../utils/axiosInstance";
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const [searchItemIsHidden, setSearchItemIsHidden] = useState(false);
  const getItemsURL = "/items";
  const navigate = useNavigate();
  const {
    response: searchRes,
    loading: searchIsLoading,
    axiosFetch: callSearch,
  } = useAxiosFunction();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchValue.length === 0) return;
    navigate(`/items/name/${searchValue}`);
    setSearchValue("");
    setIsFocused(false);
  };

  //Search
  const handleValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue.length === 0) {
      setSearchedItems([]);
      return;
    }
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
      setSearchItemIsHidden(true);
    } else {
      setSearchItemIsHidden(false);
    }

    if (searchRes) {
      setSearchedItems(searchRes.itemList.slice(0, 5));
    }
  }, [searchRes, isFocused]);

  const handleOnClickSearchList = () => {
    setSearchItemIsHidden(false);
  };

  return (
    <form onSubmit={handleSubmit} className={classes["control-form"]}>
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={handleValueChange}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      <button type="submit">
        {searchIsLoading ? <LoadingSpinner /> : <SearchIcon />}
      </button>
      <SearchList
        items={searchedItems}
        onClick={handleOnClickSearchList}
        isHidden={searchItemIsHidden}
      />
    </form>
  );
};

export default SearchBar;
