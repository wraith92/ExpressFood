import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

function PageRecap() {
  const [plats, setPlats] = useState([]);
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    const platsFromStorage = JSON.parse(localStorage.getItem('plats'));
    const dessertsFromStorage = JSON.parse(localStorage.getItem('desserts'));

    if (platsFromStorage) {
      setPlats(platsFromStorage);
    }

    if (dessertsFromStorage) {
      setDesserts(dessertsFromStorage);
    }
  }, []);

  const renderOrderItems = (items) => {
    return items.map((item, index) => (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{item.price.toFixed(2)} €</td>
        <td>{(item.price * item.quantity).toFixed(2)} €</td>
      </tr>
    ));
  };

  const renderTotalPrice = () => {
    const totalPrice =
      plats.reduce((acc, curr) => acc + curr.price * curr.quantity, 0) +
      desserts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    return <h4>Total: {totalPrice.toFixed(2)} €</h4>;
  };

  return (
    <div>
      <h2>Récapitulatif de la commande</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Article</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4">
              <h3>Plats</h3>
            </td>
          </tr>
          {renderOrderItems(plats)}
          <tr>
            <td colSpan="4">
              <h3>Desserts</h3>
            </td>
          </tr>
          {renderOrderItems(desserts)}
        </tbody>
      </Table>
      {renderTotalPrice()}
      <Button variant="primary">Procéder au paiement</Button>
    </div>
  );
}

export default PageRecap;
