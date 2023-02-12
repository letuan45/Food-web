import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import { Link, useLocation} from "react-router-dom";

const CustomPagination = (props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

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