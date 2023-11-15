// Navbar.js
import React, { useEffect } from 'react';
import { Navbar as MyNav, Nav, Container } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { logoutUserAction } from '../action/AuthAction';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storageUserinfo = JSON.parse(localStorage.getItem('user'));
    const isAdmin = storageUserinfo && storageUserinfo.role === 'admin';
    const isDeliveryPerson = storageUserinfo && storageUserinfo.role === 'livreur';
    const isClient = storageUserinfo && storageUserinfo.role === 'client';
  


    const handleLogout = () => {
        dispatch(logoutUserAction());
        navigate('/');
    };


    

    

    return (
        <MyNav bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <MyNav.Brand as={Link} to="/">Accueil</MyNav.Brand>
                <MyNav.Toggle aria-controls="responsive-navbar-nav" />
                <MyNav.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/dashboard" disabled={!isClient}>Dashboard user</Nav.Link>

                        {isAdmin && (
                            <Nav.Link as={Link} to="/admin-dashboard">Dashboard Admin</Nav.Link>
                        )}

                        {isDeliveryPerson && (
                            <Nav.Link as={Link} to="/delivery-dashboard">Dashboard Livreur</Nav.Link>
                        )}

                        {storageUserinfo ? (
                            <>
                                <Nav.Link as={Link} to="/cart">Panier</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </MyNav.Collapse>
            </Container>
        </MyNav>
    );
};

export default Navbar;
