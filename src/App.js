import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Footer from "./components/UI/Footer/Index";
import ShopPage from "./pages/ShopPage";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishListPage from "./pages/WishListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import CheckoutSuccess from "./components/PagesContent/CheckoutSuccess";
import ChangePassword from "./components/UI/Modal/ChangePassword/ChangePassword";
import ForgetPassPage from "./pages/ForgetPassPage";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ShopPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/items/page/:pageNum" element={<ShopPage />} />
          <Route path="/items/id_type/:idType" element={<ShopPage />} />
          <Route
            path="/items/page/:pageNum/id_type/:idType"
            element={<ShopPage />}
          />
          <Route
            path="/items/id_type/:idType/typesort/:typeSort"
            element={<ShopPage />}
          />
          <Route path="/items/typesort/:typeSort" element={<ShopPage />} />
          <Route
            path="/items/page/:pageNum/typesort/:typeSort"
            element={<ShopPage />}
          />
          <Route
            path="/items/page/:pageNum/id_type/:idType/typesort/:typeSort"
            element={<ShopPage />}
          />
          <Route path="/items/name/:searchValue" element={<ShopPage />} />
          <Route
            path="/items/page/:pageNum/name/:searchValue"
            element={<ShopPage />}
          />
          <Route
            path="/items/name/:searchValue/typesort/:typeSort"
            element={<ShopPage />}
          />
          <Route
            path="/items/page/:pageNum/name/:searchValue/typesort/:typeSort"
            element={<ShopPage />}
          />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wish-list" element={<WishListPage />} />
          <Route
            path="/items/detail/:productId"
            element={<ProductDetailPage />}
          />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailPage />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/forget-pass" element={<ForgetPassPage />} />
        </Routes>
      </Layout>
      <Footer />
    </div>
  );
}

export default App;
