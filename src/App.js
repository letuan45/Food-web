import './App.css';
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from './pages/HomePage';


function App() {
  console.log('Hello word')

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
