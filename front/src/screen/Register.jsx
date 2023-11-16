import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../action/AuthAction";
import FormContainer from "../components/FormContainer";
import Loading from "../components/Loading";

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [role, setrole] = useState("");
    const [confirmerMotDePasse, setConfirmerMotDePasse] = useState("");
    const { loading, userinfo, error } = useSelector((state) => state.userLogin);

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(registerUserAction({ nom, prenom, email, motDePasse, confirmerMotDePasse ,role:"client"}));
        if (error==="") {
            navigate('/login');
        }

    };
    console.log(userinfo);

    useEffect(() => {
        if (userinfo) {
            navigate('/login');
        }
    }, [navigate, userinfo]);

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <p>{error}</p>}
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="nom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="prenom">
                    <Form.Label>Prenom</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter prenom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                </Form.Group>
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
                <Form.Group controlId="confirmerMotDePasse">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmerMotDePasse}
                        onChange={(e) => setConfirmerMotDePasse(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="role">
                    <Form.Label>role</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter role"
                        value={role}
                        onChange={(e) => setrole(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Register
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Have an Account?{" "}
                    <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default Register;

