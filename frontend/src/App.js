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

const App = () => {
  return (
    <Router>
      {/* home page route */}
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
         {" "}

          {/* Edit item route */}
        <Route path="/items" element={<ItemsList />} />
         {" "}
        {/* Edit user route */}
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />{" "}
       

        {/* Edit Home route */}
        <Route path="/homeCard" element={<HomeCardsList/>}/>
        
      </Routes>
    </Router>
  );
};

export default App;
