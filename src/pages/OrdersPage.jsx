import BreadCrumbs from "../components/UI/BreadCrumbs";
import background from "../assets/images/backgrounds/breadcrumb.jpg";
import OrdersPageMain from "../components/PagesContent/OrdersPageMain";

const OrdersPage = () => {
  return (
    <div>
      <BreadCrumbs ordersBreadcrumbs background={background} />
      <OrdersPageMain />
    </div>
  );
};

export default OrdersPage;
