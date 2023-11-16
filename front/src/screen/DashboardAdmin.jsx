// DashboardAdmin.js

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserAction,
  updateUserAction,
  deleteUserAction,
  addUserAction,
} from '../action/UserAction';

import { fetchCommandeAction } from '../action/CommandeAction';
import { fetchPlatAction } from '../action/PlatAction';

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector(
    (state) => state.users.data || {}
  );

  const { commandes = [], loadingCommande, errorCommande } = useSelector(
    (state) => state.commandes.data || {}
  );

  const { plats = [], loadingPlat, errorPlat } = useSelector(
    (state) => state.plats.data || {}
  );
  console.log(plats);
  console.log(commandes);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    nom: '',
    email: '',
    role: 'Livreur',
    motDePasse: '',
  });

  useEffect(() => {
    // Fetch users on component mount
    dispatch(fetchUserAction());
    dispatch(fetchCommandeAction());
    dispatch(fetchPlatAction());
  }, [dispatch]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddUser = async () => {
    try {
      // Dispatch the action to add a new user
      dispatch(addUserAction(newUser));
    } catch (error) {
      console.error('Error adding user:', error);
    }
    handleCloseModal();
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Dispatch the action to delete a user
      dispatch(deleteUserAction(userId));
      window.location.reload();

    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateUser = async (userId) => {
    try {
      // Dispatch the action to update a user
      dispatch(updateUserAction(userId));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Container>
      <h2 className="text-center">Tableau de bord administrateur</h2>

      <Button variant="success" onClick={handleShowModal} className="mb-3">
        Ajouter
      </Button>

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
          {users.map((user) => (
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

      <Table bordered>
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
                  // Utilisez la méthode filter pour trouver le plat correspondant dans votre liste de plats
                  const platCorrespondant = plats.find((p) => p.plat === plat.plat._id);

                  // Si le plat correspondant est trouvé, affichez son nom
                  if (platCorrespondant) {
                    return (
                      <p key={plat._id}>
                        {platCorrespondant.nom} x {plat.quantite}
                      </p>
                    );
                  } else {
                    // Si le plat correspondant n'est pas trouvé, affichez un message d'erreur ou ignorez cet élément
                    return (
                      <p key={plat._id}>
                        Plat introuvable x {plat.quantite}
                      </p>
                    );
                  }
                })}
              </td>
              <td>{commande.date}</td>
              <td>{commande.statut}</td>
              <td>{commande.prix} €</td>
            </tr>
          ))}
        </tbody>
      </Table>


      {/* Modal pour ajouter un nouvel utilisateur */}
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
                onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez l'email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Rôle</Form.Label>
              <Form.Control
                as="select"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="Livreur">Livreur</option>
                <option value="Administrateur">Administrateur</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez le mot de passe"
                value={newUser.
                  motDePasse}
                onChange={(e) => setNewUser({ ...newUser, motDePasse: e.target.value })}
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
