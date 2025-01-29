import React, { useState } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import HomeCardsList from "../homePage/HomeCardsList";
import UsersList from "../../Users/UsersList";
import AddUser from "../../Users/AddUser";
import EditUser from "../../Users/EditUser";
import ItemsList from "../../Items/ItemsList";

const AdminLayout = () => {
  // State to track the currently active page/component
  const [activePage, setActivePage] = useState("dashboard");

  // Event handler to change the active page
  const handleNavigation = (page) => {
    setActivePage(page); // Update the active page state
  };

  return (
    <Container fluid>
      <Row>
        {/* Left Sidebar - Navbar */}
        <Col
          variant="dark"
          bg="secondary"
          xs={2}
          className="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-1"
          style={{ height: "100vh" }}
        >
          <Navbar.Brand className="text-dark">Admin Panel</Navbar.Brand>
          <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link
              onClick={() => handleNavigation("dashboard")}
              className="text-dark"
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              onClick={() => handleNavigation("users")}
              className="text-dark"
            >
              Users Master
            </Nav.Link>
            <Nav.Link
              onClick={() => handleNavigation("items")}
              className="text-dark"
            >
              Items Master
            </Nav.Link>
            <Nav.Link
              onClick={() => handleNavigation("homeCard")}
              className="text-dark"
            >
              Home Page Master
            </Nav.Link>
          </Nav>
        </Col>

        {/* Right Side - Body */}
        <Col xs={10} className="p-4">
          {/* Conditional rendering based on the active page state */}
          {activePage === "homeCard" && <HomeCardsList />}
          {activePage === "users" && <UsersList />}
          {activePage === "addUser" && <AddUser />}
          {activePage === "editUser" && <EditUser />}
          {activePage === "items" && <ItemsList />}
          {activePage === "dashboard" && <div>Dashboard Content</div>}{" "}
          {/* Replace with your actual Dashboard component */}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLayout;
