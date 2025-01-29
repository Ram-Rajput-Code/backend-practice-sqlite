import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import HomeCardsList from "../homePage/HomeCardsList";
import UsersList from "../../Users/UsersList";
import AddUser from "../../Users/AddUser";
import EditUser from "../../Users/EditUser";
import ItemsList from "../../Items/ItemsList";

// Import your components

const AdminLayout = () => {
  const location = useLocation(); // Get the current URL

  return (
    <Container fluid>
      <Row>
        {/* Left Sidebar - Navbar */}
        <Col
          xs={2}
          className="bg-dark text-white p-3"
          style={{ height: "100vh" }}
        >
          <Navbar.Brand href="/admin" className="text-white">
            Admin Panel
          </Navbar.Brand>
          <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link href="/admin" className="text-white">
              Dashboard
            </Nav.Link>
            <Nav.Link href="/users" className="text-white">
              Users Master
            </Nav.Link>
            <Nav.Link href="/items" className="text-white">
              Items Master
            </Nav.Link>
            <Nav.Link href="/homeCard" className="text-white">
              Home Page Master
            </Nav.Link>
          </Nav>
        </Col>

        {/* Right Side - Body */}
        <Col xs={10} className="p-4">
          {/* Conditional rendering based on the current URL */}
          {location.pathname === "/homeCard" && <HomeCardsList />}
          {location.pathname === "/users" && <UsersList />}
          {location.pathname === "/users/add" && <AddUser />}
          {location.pathname === "/users/edit" && <EditUser />}
          {location.pathname === "/items" && <ItemsList />}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLayout;
