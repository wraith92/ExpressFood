import React from 'react';
import { Navbar as MyNav, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutUserAction } from '../action/AuthAction';

const Navbar = () => {
    const { userinfo } = useSelector((state) => state.userinfo);

    return (
        <MyNav bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <MyNav.Brand as={Link} to="/">Accueil</MyNav.Brand>
                <MyNav.Toggle aria-controls="responsive-navbar-nav" />
                <MyNav.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {userinfo?.role === "client" && (
                            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        )}
                        {!userinfo?.token && (  // Display "Login" only if not authenticated
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {userinfo?.token && (
                            <Nav.Link as={Link} to="/logout" onClick={logoutUserAction}>Logout</Nav.Link>
                        )}

                    </Nav>
                </MyNav.Collapse>
            </Container>
        </MyNav>
    );
};

export default Navbar;
