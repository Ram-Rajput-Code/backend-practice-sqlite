import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <Navbar expand="lg" variant="dark" bg="secondary">
        <Container>
          {/* Brand Name or Logo */}
          <Navbar.Brand as={Link} to="/" style={{ color: 'white' }}>
            My App
          </Navbar.Brand>

          {/* Toggle button for mobile menu */}
          <Navbar.Toggle aria-controls="navbar-nav" />

          {/* Navbar Links */}
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto"> {/* This will push navbar items to the right */}
              <Nav.Link as={Link} to="/" style={{ color: 'white' }}>Home</Nav.Link>
              <Nav.Link as={Link} to="/users" style={{ color: 'white' }}>User</Nav.Link>
              <Nav.Link as={Link} to="/items" style={{ color: 'white' }}>Item</Nav.Link>
              <Nav.Link as={Link} to="/homeCard" style={{ color: 'white' }}>Home Card</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </>
  );
};

export default NavBar;
