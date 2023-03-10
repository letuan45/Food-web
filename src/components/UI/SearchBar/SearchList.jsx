import SearchBarItem from "./SearchBarItem/SearchBarItem";
import classes from "./SearchList.module.css";

const SearchList = (props) => {
  const { items } = props;

  if (items.length === 0) return;

  return (
    <ul
      className={`${classes["search-list"]} ${
        props.isHidden ? classes.hidden : ""
      }`}
    >
      {items.map((item) => (
        <SearchBarItem
          item={item}
          key={item["id_item"]}
          onClick={props.onClick}
        />
      ))}
    </ul>
  );
};

export default SearchList;
