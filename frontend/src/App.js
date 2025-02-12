import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/pages/NavBar/NavBar";
import AdminLayout from "./components/pages/Admin/AdminLayout";
import Product from "./components/pages/productPage/Product";

import HomePage from "./components/pages/homePage/HomePage";

const App = () => {
  return (
    <Router>
      <NavBar />

      {/* <HomePageSliderAdmin/> */}
      <Routes>
        {/* home page route */}
        <Route
          path="/"
          element={
            <>
              <HomePage />
            </>
          }
        />
        {/* product page route */}
        <Route
          path="/product"
          element={
            <>
              {/* <NavBar /> */}
              <Product />
            </>
          }
        />

        {/* Edit item route */}
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
