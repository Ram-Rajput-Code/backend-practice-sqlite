import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemsList from "./components/Items/ItemsList";
import AddItem from "./components/Items/AddItem";
import EditItem from "./components/Items/EditItem"; // Import EditItem
import UsersList from "./components/Users/UsersList";
import AddUser from "./components/Users/AddUser";
import EditUser from "./components/Users/EditUser"; // Import EditUser
import Home from "./components/pages/homePage/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeCardsList from "./components/pages/homePage/HomeCardsList";
import NavBar from "./components/pages/NavBar/NavBar";
import AdminLayout from "./components/pages/Admin/AdminLayout";
import Product from "./components/pages/productPage/Product";

const App = () => {
  return (
    <Router>
      <NavBar />
     
      <Routes>
        {/* home page route */}
        <Route
          path="/"
          element={
            <>
              {/* <NavBar /> */}
              <Home />
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
