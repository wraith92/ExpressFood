import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PlatCard = ({ plats, addToCart }) => {
  return (
    <Row xs={1} md={3} className="g-4">
      {plats.map((plat) => (
        <Col key={plat._id}>
          <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
              <Card.Title>{plat.nom}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{plat.type}</Card.Subtitle>
              <Card.Text>
                Ingredients: {plat.ingredients.join(', ')}
              </Card.Text>
              {plat.description && <Card.Text>{plat.description}</Card.Text>}
              <Card.Text>
                {plat.quantite !== undefined ? `Quantity: ${plat.quantite}` : ''}
              </Card.Text>
              <Button variant="primary" onClick={() => addToCart(plat)}>
                Ajouter au panier
              </Button>
              <Card.Text>
                {plat.prix !== undefined ? (
                  <span style={{ color: 'green' }}>Price: ${plat.prix.toFixed(2)}</span>
                ) : (
                  ''
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PlatCard;
