import classes from "./index.module.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

//props: background: img, cartBreadcumbs: bool, checkOutBreadcumbs: bool,...
//breadcumbAddition
const index = (props) => {
  const { background } = props;

  //Default: Shop
  let breadcrumbs = [
    {
      title: "Thực đơn",
      link: "/shop",
    },
  ];

  if (props.cartBreadcumbs) {
    breadcrumbs = [
      {
        title: "Giỏ hàng",
        link: "/cart",
      },
    ];
  }

  if (props.checkOutBreadcrumbs) {
    breadcrumbs = [
      {
        title: "Thanh toán",
        link: "/checkout",
      },
    ];
  }

  if (props.registerBreadcrumbs) {
    breadcrumbs = [
      {
        title: "Đăng ký",
        link: "/register",
      },
    ];
  }

  if (props.wishListBreadcrumbs) {
    breadcrumbs = [
      {
        title: "Yêu thích",
        link: "/wish-list",
      },
    ];
  }

  if (props.breadcrumbAddition) {
    breadcrumbs.push(props.breadcrumbAddition);
  }

  const breadcrumbsContent = breadcrumbs.map((item, index) => {
    if (index === breadcrumbs.length - 1) {
      return (
        <li key={index} className={classes["brc-item"]}>
          <span>{item.title}</span>
        </li>
      );
    }

    return (
      <Fragment key={index}>
        <li className={classes["brc-item"]}>
          <Link to={item.link}>{item.title}</Link>
        </li>
        <li className={classes["chevon"]}>
          <ChevronRightRoundedIcon />
        </li>
      </Fragment>
    );
  });

  return (
    <section className="breadcrumbs.">
      <div
        className={classes.wrapper}
        style={{ backgroundImage: `url(${background})`, padding: "80px 0", backgroundSize: "cover"}}
      >
        <h1 className={classes.header}>
          {breadcrumbs[breadcrumbs.length - 1].title}
        </h1>
        <ul className={classes["breadcrumbs-list"]}>
          <li className={classes["brc-item"]}>
            <Link to="/">Trang chủ</Link>
          </li>
          <li className={classes["chevon"]}>
            <ChevronRightRoundedIcon />
          </li>
          {breadcrumbsContent}
        </ul>
      </div>
    </section>
  );
};

export default index;
