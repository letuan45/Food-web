import WishList from "../components/WishList/WishList";
import BreadCrumbs from "../components/UI/BreadCrumbs";
import background from "../assets/images/backgrounds/breadcrumb.jpg";

const WishListPage = () => {
  return (
    <div>
      <BreadCrumbs wishListBreadcrumbs background={background}/>
      <WishList />
    </div>
  );
};

export default WishListPage;
