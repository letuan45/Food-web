import React from "react";

import Slider from "../components/Slider/MainSlider";
import BannerList from "../components/Banner/BannerList";
import Advertise from "../components/Advertise/Advertise";
import HomePageFoods from "../components/HomePageFoods/HomePageFoods";
import MenuList from "../components/Menu/MenuList";
import HealthyAd from "../components/Healthy/HealthyAd";
import Delivery from "../components/Delivery/Delivery";
import BurgerOff from "../components/BurgerOff/BurgerOff";
import PizzaAdvertisement from "../components/PizaAdvertisement/PizzaAdvertisement";
import LastestReviews from "../components/LastestReviews/LastestReviews";
import OurServices from "../components/OurServices/OurServices";
import GetDiscount from "../components/GetDiscount/GetDiscount";

import { ParallaxProvider } from "react-scroll-parallax";

const HomePage = () => {
  return (
    <ParallaxProvider>
      <div>
        <Slider />
        <BannerList />
        <Advertise />
        <HomePageFoods />
        <MenuList />
        <HealthyAd />
        <Delivery />
        <BurgerOff />
        <PizzaAdvertisement />
        <OurServices />
        <LastestReviews />
        <GetDiscount />
      </div>
    </ParallaxProvider>
  );
};

export default HomePage;
