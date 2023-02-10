import BreadCrumbs from "../components/UI/BreadCrumbs";
import background from "../assets/images/backgrounds/breadcrumb.jpg";
import CheckoutMain from "../components/CheckoutMain.jsx/CheckoutMain";

const CheckoutPage = () => {
  return (
    <div>
      <BreadCrumbs checkOutBreadcrumbs background={background} />
      <CheckoutMain />
    </div>
  );
};

export default CheckoutPage;
