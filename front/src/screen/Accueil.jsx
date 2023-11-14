import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { fetchPlatAction } from '../action/PlatAction';
import { useDispatch,useSelector } from 'react-redux';

const Accueil = () => {
  const dispatch = useDispatch();
  const plat = useSelector((state) => state.plat);
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    dispatch(fetchPlatAction());
  }, [dispatch]);
  console.log(plat);

  return (
    <div>
      <h2>Menu du jour</h2>
      <Container className="d-flex flex-wrap justify-content-center">
        {menu.map((plat) => (
          <Card
            key={plat.id}
            className="m-3"
            style={{ width: '18rem' }}
          >
            <Card.Img variant="top" src={plat.image} />
            <Card.Body>
              <Card.Title>{plat.nom}</Card.Title>
              <Card.Text>
                {plat.description}
              </Card.Text>
              <Card.Text>
                {plat.prix} €
              </Card.Text>
              <Button variant="primary">Ajouter au panier</Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
     
    </div>
  );
};

export default Accueil;
