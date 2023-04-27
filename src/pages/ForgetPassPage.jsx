import React from 'react'
import background from "../assets/images/backgrounds/breadcrumb.jpg";
import BreadCrumbs from "../components/UI/BreadCrumbs";
import MainContainer from '../components/ForgetPassword/MainContainer/MainContainer';

const ForgetPassPage = () => {
  return (
    <div>
      <BreadCrumbs forgetPassBreadcrumbs background={background} />
      <MainContainer/>
    </div>
  );
}

export default ForgetPassPage