// Navbar.js
import React from 'react';
import { Navbar as MyNav, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <MyNav bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <MyNav.Brand as={Link} to="/">Accueil</MyNav.Brand>
            <MyNav.Toggle aria-controls="responsive-navbar-nav" />
            <MyNav.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/dashboard" disabled>Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </Nav>
            </MyNav.Collapse>
        </Container>
    </MyNav>
);

export default Navbar;
