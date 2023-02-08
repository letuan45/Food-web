import BreadCrumbs from "../components/UI/BreadCrumbs";
import background from "../assets/images/backgrounds/breadcrumb.jpg";
import ShopPageMain from "../components/PagesContent/ShopPageMain";

const ShopPage = () => {
  return (
    <div>
      <BreadCrumbs background={background}></BreadCrumbs>
      <ShopPageMain/>
    </div>
  );
};
export default ShopPage;
