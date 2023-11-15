import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

function PageDeCommande() {
  const [plats, setPlats] = useState([
    { nom: "Plat 1", description: "Un plat délicieux qui satisfera vos papilles gustatives", prix: 10.99, image: "https://via.placeholder.com/150", stock: 5, quantity: 0 },
    { nom: "Plat 2", description: "Un plat qui vous mettra l'eau à la bouche", prix: 12.99, image: "https://via.placeholder.com/150", stock: 3, quantity: 0 }
  ]);
  const [desserts, setDesserts] = useState([
    { nom: "Dessert 1", description: "Une douceur qui vous fera plaisir", prix: 5.99, image: "https://via.placeholder.com/150", stock: 8, quantity: 0 },
    { nom: "Dessert 2", description: "Un dessert décadent qui satisfera votre dent sucrée", prix: 7.99, image: "https://via.placeholder.com/150", stock: 10, quantity: 0 }
  ]);
  const [cart, setCart] = useState([]);

  const handlePlatChange = () => {
    setPlats([
      { nom: "Nouveau Plat 1", description: "Un nouveau plat délicieux qui satisfera vos papilles gustatives", prix: 11.99, image: "https://via.placeholder.com/150", stock: 6, quantity: 0 },
      { nom: "Nouveau Plat 2", description: "Un nouveau plat qui vous mettra l'eau à la bouche", prix: 13.99, image: "https://via.placeholder.com/150", stock: 4, quantity: 0 }
    ]);
  };

  const handleDessertChange = () => {
    setDesserts([
      { nom: "Nouveau Dessert 1", description: "Une nouvelle douceur qui vous fera plaisir", prix: 6.99, image: "https://via.placeholder.com/150", stock: 7, quantity: 0 },
      { nom: "Nouveau Dessert 2", description: "Un nouveau dessert décadent qui satisfera votre dent sucrée", prix: 8.99, image: "https://via.placeholder.com/150", stock: 9, quantity: 0 }
    ]);
  };

  const handleAddToCart = (item) => {
    if (item.stock >= item.quantity && item.quantity > 0) {
      const newItem = { ...item };
      setCart([...cart, newItem]);

      setPlats((prevPlats) =>
        prevPlats.map((plat) =>
          plat.nom === item.nom ? { ...plat, stock: plat.stock - item.quantity, quantity: 0 } : plat
        )
      );

      setDesserts((prevDesserts) =>
        prevDesserts.map((dessert) =>
          dessert.nom === item.nom ? { ...dessert, stock: dessert.stock - item.quantity, quantity: 0 } : dessert
        )
      );
    } else if (item.quantity === 0) {
      alert("Veuillez spécifier la quantité.");
    } else {
      alert("La quantité spécifiée dépasse le stock disponible.");
    }
  };

  const handleQuantityChange = (item, newQuantity) => {
    const newItem = { ...item, quantity: newQuantity };
    if (newQuantity >= 0) {
      setPlats((prevPlats) =>
        prevPlats.map((plat) =>
          plat.nom === item.nom ? { ...plat, quantity: newQuantity } : plat
        )
      );
      setDesserts((prevDesserts) =>
        prevDesserts.map((dessert) =>
          dessert.nom === item.nom ? { ...dessert, quantity: newQuantity } : dessert
        )
      );
    }
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    const removedItem = newCart.splice(index, 1)[0];
    setCart(newCart);

    setPlats((prevPlats) =>
      prevPlats.map((plat) =>
        plat.nom === removedItem.nom ? { ...plat, stock: plat.stock + removedItem.quantity, quantity: 0 } : plat
      )
    );

    setDesserts((prevDesserts) =>
      prevDesserts.map((dessert) =>
        dessert.nom === removedItem.nom ? { ...dessert, stock: dessert.stock + removedItem.quantity, quantity: 0 } : dessert
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.prix * item.quantity, 0);
  };

  return (
    <Container>
      <h1>Page de Commande</h1>
      <Row>
        <Col>
          <h2>Plats</h2>
          {plats.map((plat, index) => (
            <Card key={index} style={{ marginBottom: "20px" }}>
              <Image src={plat.image} fluid />
              <Card.Body>
                <Card.Title>{plat.nom}</Card.Title>
                <Card.Text>{plat.description}</Card.Text>
                <Card.Text>Prix: {plat.prix.toFixed(2)} €</Card.Text>
                <Card.Text>Stock: {plat.stock}</Card.Text>
                <Form.Group controlId={`quantity-${plat.nom}`}>
                  <Form.Label>Quantité:</Form.Label>
                  <Form.Control
                    type="number"
                    value={plat.quantity}
                    onChange={(e) => handleQuantityChange(plat, parseInt(e.target.value, 10))}
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => handleAddToCart(plat)}>Ajouter au panier</Button>
              </Card.Body>
            </Card>
          ))}
          <Button variant="primary" onClick={handlePlatChange}>Changer les Plats</Button>
        </Col>
        <Col>
          <h2>Desserts</h2>
          {desserts.map((dessert, index) => (
            <Card key={index} style={{ marginBottom: "20px" }}>
              <Image src={dessert.image} fluid />
              <Card.Body>
                <Card.Title>{dessert.nom}</Card.Title>
                <Card.Text>{dessert.description}</Card.Text>
                <Card.Text>Prix: {dessert.prix.toFixed(2)} €</Card.Text>
                <Card.Text>Stock: {dessert.stock}</Card.Text>
                <Form.Group controlId={`quantity-${dessert.nom}`}>
                  <Form.Label>Quantité:</Form.Label>
                  <Form.Control
                    type="number"
                    value={dessert.quantity}
                    onChange={(e) => handleQuantityChange(dessert, parseInt(e.target.value, 10))}
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => handleAddToCart(dessert)}>Ajouter au panier</Button>
              </Card.Body>
            </Card>
          ))}
          <Button variant="primary" onClick={handleDessertChange}>Changer les Desserts</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Panier</h2>
          {cart.map((item, index) => (
            <Card key={index} style={{ marginBottom: "20px" }}>
              <Card.Body>
                <Card.Title>{item.nom}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>Prix: {item.prix.toFixed(2)} €</Card.Text>
                <Card.Text>Quantité: {item.quantity}</Card.Text>
                <Button variant="danger" onClick={() => handleRemoveFromCart(index)}>Retirer du panier</Button>
              </Card.Body>
            </Card>
          ))}
          <h4>Total: {getTotalPrice().toFixed(2)} €</h4>
        </Col>
      </Row>
    </Container>
  );
}

export default PageDeCommande;
