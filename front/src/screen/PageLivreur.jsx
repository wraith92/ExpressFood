// Import des actions nécessaires
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {
  fetchCommandeAction,
  updateCommandeAction, // Ajouter l'action pour mettre à jour le statut de la commande
} from '../action/CommandeAction'; // Vérifier l'emplacement correct du fichier UserAction
import { fetchUserAction } from '../action/UserAction';
const PageLivreur = () => {
  const dispatch = useDispatch();

  // Utilisation des données depuis le Redux store
  const storageUserinfo = JSON.parse(localStorage.getItem('user'));
  console.log(storageUserinfo.id);

  const { commandes = [], loadingCommande, errorCommande } = useSelector(
    (state) => state.commandes.data || {}
  );
  console.log


  // Les états de notifications et de commandes passées ne sont plus nécessaires
  // Les données seront directement extraites du Redux store

  const prendreEnCharge = (commandeId) => {
    // Utiliser l'action pour mettre à jour le statut de la commande
    const statut = 'en cours de livraison';
    dispatch(updateCommandeAction(commandeId, statut));
  };

  useEffect(() => {
    // Fetch users et commandes on component mount
    dispatch(fetchUserAction());
    dispatch(fetchCommandeAction());
  }, [dispatch]);

  return (
    <div>
    <h2>Notifications</h2>
    <ul>
      {commandes
        .filter((commande) => commande.statut === 'en attente' && commande.client === storageUserinfo.id)
        .map((commande) => (
          <li key={commande._id}>
            Nouvelle commande passée
            <Button variant="success" onClick={() => prendreEnCharge(commande._id)}>
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
          {commandes.map((commande) => (
            <tr key={commande.id}>
              <td>{commande.date}</td>
              <td>{commande.plats.map((plat) => plat.nom).join(', ')}</td>
              <td>{commande.prix}</td>
              <td>{commande.plats.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PageLivreur;
