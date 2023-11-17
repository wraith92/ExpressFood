// Import des actions nécessaires
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {
  fetchCommandeAction,
  updateCommandeAction, // Ajouter l'action pour mettre à jour le statut de la commande
} from '../action/CommandeAction'; // Vérifier l'emplacement correct du fichier UserAction
import { fetchUserAction, updateUserAction } from '../action/UserAction';
const PageLivreur = () => {
  const dispatch = useDispatch();

  // Utilisation des données depuis le Redux store
  const storageUserinfo = JSON.parse(localStorage.getItem('user'));
  console.log(storageUserinfo.id);

  const { commandes = [], loadingCommande, errorCommande } = useSelector(
    (state) => state.commandes.data || {}
  );


  // Les états de notifications et de commandes passées ne sont plus nécessaires
  // Les données seront directement extraites du Redux store

  const prendreEnCharge = (commandeId) => {
    // Utiliser l'action pour mettre à jour le statut de la commande
    const statut = {
      statut: 'en cours'
    }
    dispatch(updateCommandeAction(commandeId, statut ));
    dispatch(updateUserAction(storageUserinfo.id, {statut: 'en cours de livraison'}) );
    window.location.reload();
  };

  useEffect(() => {
    // Fetch users et commandes on component mount
    dispatch(fetchUserAction());
    dispatch(fetchCommandeAction());
  }, [dispatch]);

  const validateCommande = (commandeId) => {
    // Utiliser l'action pour mettre à jour le statut de la commande
    const statut = {
      statut: 'validée'
    }
    dispatch(updateCommandeAction(commandeId, statut ));
    dispatch(updateUserAction(storageUserinfo.id, {statut: 'libre'}) );
    window.location.reload();
  }


  console.log('commandes:', commandes);

  return (
    <div>
    <h2>Notifications</h2>
    <ul>
      {commandes
        .filter((commande) => commande.statut === 'en attente' && commande.livreur === storageUserinfo.id)
        .map((commande) => (
          <li key={commande._id}>
            Nouvelle commande passée
            <Button variant="success" onClick={() => prendreEnCharge(commande._id)}>
              Prendre en charge
            </Button>
          </li>
        ))}
    </ul>

    <h2>Commandes en cours de livraison</h2>
    <ul>
      {commandes
        .filter((commande) => commande.statut === 'en cours' && commande.livreur === storageUserinfo.id)
        .map((commande) => (
          <li key={commande._id}>
            Commande en cours de livraison
            <Button variant="success" onClick={() => validateCommande(commande._id)}>
              Valider la commande
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
            <th>statut</th>
            
          </tr>
        </thead>
        <tbody>
          {commandes
        .filter((commande) => commande.livreur === storageUserinfo.id)
        .map((commande) => (
            <tr key={commande.id}>
              <td>{commande.date}</td>
              <td>{commande.plats.map((plat) => plat.nom).join(', ')}</td>
              <td>{commande.prix}</td>
              <td>{commande.plats.length}</td>
              <td>{commande.statut}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PageLivreur;
