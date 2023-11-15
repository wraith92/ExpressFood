// Commande.js
import React from 'react';
import Container from 'react-bootstrap/Container';

const Commande = () => {
  // You may fetch the order details from the server or use local storage
  const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];

  return (
    <Container>
      <h2>Commande</h2>
      {orderDetails.map((item, index) => (
        <div key={index}>
          <p>
            {item.nom} x{item.quantity} - Prix: {(item.prix * item.quantity).toFixed(2)} €
          </p>
        </div>
      ))}
      <h4>Total: {orderDetails.reduce((total, item) => total + item.prix * item.quantity, 0).toFixed(2)} €</h4>
      {/* Additional order details or actions can be added here */}
    </Container>
  );
};

export default Commande;
