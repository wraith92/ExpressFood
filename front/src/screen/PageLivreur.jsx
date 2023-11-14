// PageLivreur.js
import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const PageLivreur = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Nouvelle commande passée' },
  ]);

  const [commandesPassees, setCommandesPassees] = useState([
    { id: 1, date: '01/01/2023', plat: 'Plat 1', prix: 10, quantite: 2 },
    { id: 2, date: '02/01/2023', plat: 'Plat 2', prix: 15, quantite: 1 },
  ]);

  const prendreEnCharge = (notificationId) => {
    // Logique pour prendre en charge la commande associée à la notification
    // (peut-être supprimer la notification et mettre à jour le statut de la commande)
    setNotifications(notifications.filter((n) => n.id !== notificationId));
    // Mettre à jour le statut de la commande ou effectuer d'autres actions nécessaires
  };

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.message}
            <Button variant="success" onClick={() => prendreEnCharge(notification.id)}>
              Prendre en charge
            </Button>
          </li>
        ))}
      </ul>

      <h2>Commandes Passées</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date de la commande</th>
            <th>Nom du plat</th>
            <th>Prix</th>
            <th>Quantité</th>
          </tr>
        </thead>
        <tbody>
          {commandesPassees.map((commande) => (
            <tr key={commande.id}>
              <td>{commande.date}</td>
              <td>{commande.plat}</td>
              <td>{commande.prix}</td>
              <td>{commande.quantite}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PageLivreur;
