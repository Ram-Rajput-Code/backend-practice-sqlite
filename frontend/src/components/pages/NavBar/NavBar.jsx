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
              <Nav.Link as={Link} to="/" style={{ color: 'white' }}>About</Nav.Link>
              <Nav.Link as={Link} to="/" style={{ color: 'white' }}>Services</Nav.Link>
              <Nav.Link as={Link} to="/" style={{ color: 'white' }}>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </>
  );
};

export default NavBar;
