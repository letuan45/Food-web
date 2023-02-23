import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const CustomPagination = (props) => {
  const totalPage = +props.count;
  const [page, setPage] = useState(1);
  const { resetPaginate } = props;
  const { idType } = useParams();
  const { typeSort } = useParams();

  const handleChangePage = (event, value) => {
    props.unsetResetPaginate();
    window.scrollTo(0, 0);
    setPage(value);
  };

  useEffect(() => {
    if (resetPaginate) {
      setPage(1);
    }
  }, [resetPaginate]);


  return (
    <Pagination
      onChange={handleChangePage}
      page={page}
      count={totalPage}
      size="large"
      renderItem={(item) => (
        <PaginationItem
          active="true"
          component={Link}
          to={`/items${item.page === 1 ? "" : `/page/` + item.page}${
            idType ? `/id_type/${idType}` : ""
          }${typeSort ? `/typesort/${typeSort}` : ""}`}
          {...item}
        />
      )}
    />
  );
};

export default CustomPagination;
