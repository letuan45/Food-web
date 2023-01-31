import React from "react";
import MainNavigation from "./MainNavigation";

const index = (props) => {
  return (
    <React.Fragment>
      <MainNavigation/>
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default index;
