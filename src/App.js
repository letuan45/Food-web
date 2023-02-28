import "./App.css";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Footer from "./components/UI/Footer/Index";
import ShopPage from "./pages/ShopPage";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishListPage from "./pages/WishListPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  //unit test
  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   const expiredTime = localStorage.getItem("expiredTime");
  //   const userStored = JSON.parse(localStorage.getItem("user"));

  //   console.log("app:", storedToken, expiredTime, userStored);
  // }, []);

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
        </Routes>
      </Layout>
      <Footer />
    </div>
  );
}

export default App;
