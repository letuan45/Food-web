import "./App.css";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Footer from "./components/UI/Footer";
import ShopPage from "./pages/ShopPage";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishListPage from "./pages/WishListPage";
import ProductDetailPage from "./pages/ProductDetailPage";

import { useSelector } from "react-redux";

import Toast from "./components/UI/Toast/Toast";
import { useEffect } from "react";

function App() {
  const toastState = useSelector((state) => state.toast);

  //unit test
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const expiredTime = localStorage.getItem("expiredTime");
    const userStored = JSON.parse(localStorage.getItem("user"));

    //console.log("app:", storedToken, expiredTime, userStored);
  }, []);

  return (
    <div className="App">
      <Layout>
        {toastState.isShown ? (
          <Toast type={toastState.type}>{toastState.message}</Toast>
        ) : null}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop?page=:id" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wish-list" element={<WishListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </Layout>
      <Footer />
    </div>
  );
}

export default App;
