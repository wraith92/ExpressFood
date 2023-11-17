// DashboardAdmin.js

import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Row, Col, Card } from "react-bootstrap";
import "chart.js/auto";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserAction,
  updateUserAction,
  deleteUserAction,
} from "../action/UserAction";
import { registerUserAction } from "../action/AuthAction";

import { fetchCommandeAction } from "../action/CommandeAction";
import { fetchPlatAction } from "../action/PlatAction";

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const {
    users = [],
    loading,
    error,
  } = useSelector((state) => state.users.data || {});

  const {
    commandes = [],
    loadingCommande,
    errorCommande,
  } = useSelector((state) => state.commandes.data || {});

  const {
    plats = [],
    loadingPlat,
    errorPlat,
  } = useSelector((state) => state.plats.data || {});
  console.log(plats);
  console.log(commandes);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    nom: "",
    email: "",
    role: "",
    motDePasse: "",
    position: {
      latitude: 48.8204173,
      longitude: 2.2000949,
    },
    statut: "libre",
  });
  const [usersToShow, setUsersToShow] = useState(5);

  // Triez les utilisateurs par date dans l'ordre décroissant
  const sortedUsers = users.slice().sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  // Filtrer les derniers utilisateurs
  const latestUsers = sortedUsers.slice(0, usersToShow);
 console.log('latestUsers:', latestUsers);

  useEffect(() => {
    // Fetch users on component mount
    dispatch(fetchUserAction());
    dispatch(fetchCommandeAction());
    dispatch(fetchPlatAction());
  }, [dispatch]);

  const chartData = {
    labels: commandes.map((commande) =>
      new Date(commande.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Orders",
        fill: false,
        data: commandes.map((commande) => commande.plats.length),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddUser = async () => {
    try {
      // Dispatch the action to add a new user
      dispatch(registerUserAction(newUser));
    } catch (error) {
      console.error("Error adding user:", error);
    }
    handleCloseModal();
    window.location.reload();
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Dispatch the action to delete a user
      dispatch(deleteUserAction(userId));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateUser = async (userId) => {
    try {
      // Dispatch the action to update a user
      dispatch(updateUserAction(userId));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  return (
    <Container>
      <h2 className="text-center">Tableau de bord administrateur</h2>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Commandes par date</Card.Title>
              <Line data={chartData} />
            </Card.Body>
            
          </Card>
          
          <Button variant="success" onClick={handleShowModal} className="mb-">
        Ajouter
      </Button>
        
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Utilisateurs</Card.Title>
              <Card.Title>Utilisateurs</Card.Title>
    <div className="table-responsive">
      <Table bordered>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {latestUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.nom}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Supprimer
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateUser(user.id)}
                >
                  Modifier
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Commandes</Card.Title>
          <div className="table-responsive">
          <Table bordered >
            <thead>
              <tr>
                <th>Client</th>
                <th>Livreur</th>
                <th>Plats</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((commande) => (
                <tr key={commande._id}>
                  <td>
                    {/* Recherchez le client correspondant dans la liste de clients */}
                    {users.map((client) => {
                      if (client._id === commande.client) {
                        console.log(commande.date);
                        return client.nom;
                      }
                      return null;
                    })}
                  </td>

                  <td>
                    {/* Recherchez le livreur correspondant dans la liste de livreurs */}
                    {users.map((livreur) => {
                      if (livreur._id === commande.livreur) {
                        return livreur.nom;
                      }
                      return null;
                    })}
                  </td>
                  <td>
                    {commande.plats.map((plat) => {
                      // Use the filter method to find the corresponding dish based on plat._id
                      const platCorrespondant = plats.filter(
                        (p) => p._id === plat.plat
                      )[0];

                      // If the corresponding dish is found, display its name
                      if (platCorrespondant) {
                        return (
                          <p key={plat._id}>
                            {platCorrespondant.nom} x {plat.quantite}
                          </p>
                        );
                      }

                      // If no corresponding dish is found, you can handle it accordingly
                      return (
                        <p key={plat._id}>Unknown Dish x {plat.quantite}</p>
                      );
                    })}
                  </td>
                  <td>{commande.date}</td>
                  <td>{commande.statut}</td>
                  <td>{commande.prix} €</td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un nouvel utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le nom"
                value={newUser.nom}
                onChange={(e) =>
                  setNewUser({ ...newUser, nom: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez l'email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Rôle</Form.Label>
              <Form.Control
                as="select"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option value="Livreur">livreur</option>
                <option value="Administrateur">admin</option>
                <option value="client">client</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez le mot de passe"
                value={newUser.motDePasse}
                onChange={(e) =>
                  setNewUser({ ...newUser, motDePasse: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DashboardAdmin;
