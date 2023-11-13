// PlatCard.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const PlatCard = ({ plats }) => {
    return (
        <div>
            {plats.map((plat) => (
                <Card key={plat._id} className="m-3" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={plat.image} alt={plat.nom} />
                    <Card.Body>
                        <Card.Title>{plat.nom}</Card.Title>
                        <Card.Text>
                            <strong>Ingredients:</strong> {plat.ingredients.join(', ')}
                        </Card.Text>
                        <Card.Text>
                            <strong>Prix:</strong> {plat.prix.toFixed(2)} €
                        </Card.Text>
                        <Card.Text>
                            <strong>Type:</strong> {plat.type}
                        </Card.Text>
                        <Button variant="primary">Commander</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default PlatCard;
