import './App.css';
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from './pages/HomePage';
import Footer from "./components/UI/Footer";

function App() {

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </Layout>
      <Footer/>
    </div>
  );
}

export default App;
