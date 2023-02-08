import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import { Link } from "react-router-dom";

const CustomPagination = (props) => {
  const page = 1;

  return (
    <Pagination
      page={page}
      count={10}
      size="large"
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/shop${item.page === 1 ? "" : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
};

export default CustomPagination;
