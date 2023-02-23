import classes from "./WishList.module.css";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WishListItem from "./WishListItem";

const WishList = () => {
  const wishList = useSelector((state) => state.wishList.items);
  const wishListLength = wishList ? wishList.length : 0;
  const user = useSelector((state) => state.auth.user);

  let content;
  if (!user) {
    content = (
      <p className={classes["alert-wrapper"]}>
        <ErrorOutlineIcon />
        Bạn hãy đăng nhập để tương tác.
      </p>
    );
  } else if (wishListLength === 0) {
    content = (
      <p className={classes["alert-wrapper"]}>
        <ErrorOutlineIcon />
        Danh sách yêu thích đang trống.
      </p>
    );
  } else {
    content = (
      <Table striped bordered style={{ borderCollapse: "inherit" }}>
        <tbody className={classes["table-body"]}>
          {wishList.map((item) => {
            return <WishListItem item={item} key={item["id_item"]} />;
          })}
        </tbody>
      </Table>
    );
  }

  return (
    <section className="wish-list-table" style={{ padding: "100px 0" }}>
      <Container fluid="md">{content}</Container>
    </section>
  );
};

export default WishList;
