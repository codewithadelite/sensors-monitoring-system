"use client";
import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <Navbar
      sticky="top"
      bg="dark text-white"
      expand="lg"
      style={{ padding: "35px 0px" }}
      className="shadow-lg"
    >
      <Container fluid>
        <Navbar.Brand href="#home" className="text-white font-bold">
          SMT PLATFORM
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-white">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="text-white font-bold">
              Home
            </Nav.Link>
            <Nav.Link href="#link" className="text-white font-bold">
              Monitoring
            </Nav.Link>
            <Nav.Link href="#link" className="text-white font-bold">
              Automation
            </Nav.Link>
            <NavDropdown
              title="Settings"
              id="basic-nav-dropdown"
              className="text-white font-bold"
              color="#000"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
