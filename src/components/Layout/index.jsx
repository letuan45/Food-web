import React from "react";
import MainNavigation from "./MainNavigation";

const index = (props) => {
  return (
    <React.Fragment>
      <MainNavigation />
      <main style={{ paddingTop: "var(--header-height)" }}>
        {props.children}
      </main>
    </React.Fragment>
  );
};

export default index;
