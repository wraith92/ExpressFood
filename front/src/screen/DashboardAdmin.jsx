import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const DashboardAdmin = () => {
  const [showModal, setShowModal] = useState(false);

  // Exemple de données factices pour les utilisateurs
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Livreur' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'Administrateur' },
    { id: 3, name: 'Bob Smith', email: 'bob@example.com', role: 'Livreur' },
  ]);

  // État pour les nouveaux utilisateurs
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Livreur', // Valeur par défaut
    password: '',
  });

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddUser = () => {
    // Génère un nouvel ID pour le nouvel utilisateur
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    // Ajoute le nouvel utilisateur à la liste
    setUsers([...users, { id: newId, ...newUser }]);
    // Réinitialise l'état du nouvel utilisateur
    setNewUser({ name: '', email: '', role: 'Livreur', password: '' });
    // Ferme la modal
    handleCloseModal();
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
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="danger" size="sm" className="mr-2">
                  Supprimer
                </Button>
                <Button variant="primary" size="sm">
                  Modifier
                </Button>
              </td>
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
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
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
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
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
