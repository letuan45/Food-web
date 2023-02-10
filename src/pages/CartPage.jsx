import BreadCrumbs from "../components/UI/BreadCrumbs";
import background from "../assets/images/backgrounds/breadcrumb.jpg";
import CartList from "../components/Cart/CartList";

const CartPage = () => {
  return (
    <div>
      <BreadCrumbs background={background} cartBreadcumbs />
      <CartList/>
    </div>
  );
};

export default CartPage;
