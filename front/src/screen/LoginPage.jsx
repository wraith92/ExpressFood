import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../action/AuthAction";
import FormContainer from "../components/FormContainer";
import Loading from "../components/Loading";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const { loading, userinfo, error } = useSelector((state) => state.userLogin);
    const redirect = location.search ? location.search.split("=")[1] : "/";

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(loginUserAction({ email, motDePasse }));
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            navigate(redirect);
        }
        // La redirection peut être effectuée directement dans le useEffect.
    };


    useEffect(() => {
        if (userinfo) {
            localStorage.setItem("user", JSON.stringify(userinfo));
            navigate(redirect);
        }
    }, [navigate, redirect, userinfo]);


    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <p>{error}</p>}
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="motDePasse">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer?{" "}
                    <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginPage;
