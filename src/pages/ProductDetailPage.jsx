import BreadCrumbs from "../components/UI/BreadCrumbs";
import background from "../assets/images/backgrounds/breadcrumb.jpg";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import { useState } from "react";
import { useCallback } from "react";

const ProductDetailPage = () => {
  const [breadcrumbAddition, setbreadcrumbAddition] = useState({})

  const handleChangeBreadcrumb = useCallback((value) => {
    setbreadcrumbAddition(value);
  }, [])

  return (
    <div>
      <BreadCrumbs
        background={background}
        breadcrumbAddition={breadcrumbAddition}
      />
      <ProductDetail onChangeBreadcrumb={handleChangeBreadcrumb}/>
    </div>
  );
};

export default ProductDetailPage;
