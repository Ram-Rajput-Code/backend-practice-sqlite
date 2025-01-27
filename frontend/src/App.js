// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ItemsList from "./components/Items/ItemsList";
// import AddItem from "./components/Items/AddItem";
// import UsersList from "./components/Users/UsersList";
// import AddUser from "./components/Users/AddUser";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/items" element={<ItemsList />} />
//         <Route path="/items/add" element={<AddItem />} />
//         <Route path="/users" element={<UsersList />} />
//         <Route path="/users/add" element={<AddUser />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

//new code
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemsList from "./components/Items/ItemsList";
import AddItem from "./components/Items/AddItem";
import EditItem from "./components/Items/EditItem"; // Import EditItem
import UsersList from "./components/Users/UsersList";
import AddUser from "./components/Users/AddUser";
import EditUser from "./components/Users/EditUser"; // Import EditUser

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/items" element={<ItemsList />} />
        <Route path="/items/add" element={<AddItem />} />
        <Route path="/items/edit/:id" element={<EditItem />} />{" "}
        {/* Edit item route */}
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />{" "}
        {/* Edit user route */}
      </Routes>
    </Router>
  );
};

export default App;
