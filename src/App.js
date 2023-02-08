import "./App.css";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Footer from "./components/UI/Footer";
import ShopPage from "./pages/ShopPage";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop?page=:id" element={<ShopPage />} />
        </Routes>
      </Layout>
      <Footer />
    </div>
  );
}

export default App;
