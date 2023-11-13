// PageLivreur.js
import React from 'react';
import Notifications from './Notifications';
import CommandesPassees from './CommandesPassees';

const PageLivreur = () => {
  // Exemple de données statiques pour les notifications
  const notifications = [
    { id: 1, message: 'Nouvelle commande passée' },
    { id: 2, message: 'Statut du livreur : disponible' },
  ];

  // Exemple de données statiques pour les commandes passées
  const commandesPassees = [
    { id: 1, client: 'Client 1', date: '01/01/2023' },
    { id: 2, client: 'Client 2', date: '02/01/2023' },
  ];

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>

      <h2>Commandes Passées</h2>
      <ul>
        {commandesPassees.map((commande) => (
          <li key={commande.id}>
            {`Commande livrée au client ${commande.client} le ${commande.date}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageLivreur;
