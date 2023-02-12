import BreadCrumbs from "../components/UI/BreadCrumbs";
import background from "../assets/images/backgrounds/breadcrumb.jpg";
import ProductDetail from "../components/ProductDetail/ProductDetail";

const ProductDetailPage = () => {
  const breadcrumbAddition = {
    title: "Tên sản phẩm",
    link: "/product/1",
  };

  return (
    <div>
      <BreadCrumbs
        background={background}
        breadcrumbAddition={breadcrumbAddition}
      />
      <ProductDetail/>
    </div>
  );
};

export default ProductDetailPage;
