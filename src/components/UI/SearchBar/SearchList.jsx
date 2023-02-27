import SearchBarItem from "./SearchBarItem/SearchBarItem";
import classes from "./SearchList.module.css";

const SearchList = (props) => {
  const { items } = props;
  
  return <ul className={classes["search-list"]}>
    {items.map(item => <SearchBarItem item={item} key={item["id_item"]}/>)}
  </ul>;
};

export default SearchList;
