import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { fetchCommandeAction } from '../action/CommandeAction';
import { fetchUserAction, updateUserAction } from '../action/UserAction';
import { Row } from 'react-bootstrap';

const PageSuivieClient = () => {
  const dispatch = useDispatch();

  // Use the correct selector to access the commandes array
  const { commandes } = useSelector((state) => state.commandes.data || {});
  console.log(commandes);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchCommandeAction());
    dispatch(fetchUserAction());
  }, [dispatch]);

  // Get the user ID from local storage
  const storageUserinfo = JSON.parse(localStorage.getItem('user')) ?? null;
  const userId = storageUserinfo?.id;

  // Filter commands based on the user ID
  const filteredCommands = commandes?.filter((commande) => commande.client === userId) ?? null;

  return (
    <Container>
        <Row>
        <h2> Vos Commandes</h2>
        <div className='table-responsive'>
        {filteredCommands === null ? (
          <p>No orders available.</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Prix</th>
                <th>Etat</th>

              </tr>
            </thead>
            <tbody>
              {filteredCommands.map((commande) => (
                <tr key={commande._id}>
                  <td>{commande._id}</td>
                  <td>{commande.date}</td>
                  <td>{commande.prix}</td>
                  <td>{commande.statut}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
        </Row>

    </Container>
  );
};

export default PageSuivieClient;
