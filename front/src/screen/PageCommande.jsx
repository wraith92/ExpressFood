import React, {  useState, useCallback,useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, Button } from 'react-bootstrap';
import MapComponent from '../components/MapComponent';
import { useNavigate } from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import axios from 'axios';
import { addCommandeAction } from '../action/CommandeAction';
import { updateUserAction , livreurProchAction } from '../action/UserAction';
import { useSelector } from 'react-redux';

const Order = () => {

const cart = JSON.parse(localStorage.getItem('cart')) ?? [];

// Rest of your code...

  const user = JSON.parse(localStorage.getItem('user'));
// Calculate the total price dynamically based on the items in the cart
const totalPrice = cart.reduce((total, item) => total + item.prix * item.quantity, 0).toFixed(2);

// Calculate the delivery fee percentage and final price
const deliveryFeePercentage = 0.05;
const finalPrice = parseFloat(totalPrice) * (1 + deliveryFeePercentage);
  console.log('user:', user);
  console.log('cart:', cart);


  const clientId = user.id
  console.log('clientId:', clientId);
  const [position, setPosition] = useState(null);
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState('');
  const apiKey = "AIzaSyADfAV-7und2u2Ex3IYD2VRW4HulKn0Ujg";
  const center = { lat: 37.7749, lng: -122.4194 };
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleAddressChange = useCallback((e) => {
    setAddress(e.target.value);
  }, []);

  const handleSearch = useCallback(async () => {
    try {
      const results = await geocodeAddress(address);
      if (results.length > 0) {
        const latLng = await getLatLng(results[0]);
        setPosition(latLng);
        if (map) {
          map.panTo(latLng);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la recherche d\'adresse :', error);
    }
  }, [address, map]);

  const geocodeAddress = async (address) => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  };

  const getLatLng = async (result) => {
    return {
      lat: result.geometry.location.lat(),
      lng: result.geometry.location.lng(),
    };
  };

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleValidation = async () => {
    try {
      // Get the client ID and total price from local storage

      const totalPrice = cart.reduce((total, item) => total + item.prix * item.quantity, 0).toFixed(2);

      // Get the updated position from the map
      const updatePosition = {
        position: {
          latitude: position.lat,
          longitude: position.lng
        }
      };
      console.log('updatedPosition:', updatePosition);

      // Dispatch the action to update the user's position
      await dispatch(updateUserAction(clientId,updatePosition));

      // Call the endpoint to find the nearest delivery person
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
      console.log('token:', user.token);
      const response = await axios.get(`http://localhost:8080/api/users/livreurProche/${clientId}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });
      const livreurProche = response.data.livreurProche;
      console.log('livreurProche:', livreurProche._id);

      // Dispatch the action to add a new order
      const order = {
        plats: cart.map(item => ({
          plat: item._id, // Remplacez item.id par la propriété correcte de votre objet plat
          quantite: item.quantity,
        })),
        livreur: livreurProche._id,
        client: clientId,
        date: new Date(), // Vous pouvez ajuster cela en fonction de la manière dont vous souhaitez gérer la date
        statut: 'en attente',
        prix: parseFloat(totalPrice), // Assurez-vous que le prix est un nombre
      };
      console.log('order:', order);
      await dispatch(addCommandeAction(order));

      // Hide the map and perform any other necessary actions
      setMap(null);
      localStorage.removeItem('cart');
      navigate('/');
    } catch (error) {
      console.error('Error validating order:', error);
    }
  };

  return (
    <Container>
      {cart.length === 0 ? (
        <h2>Votre panier est vide. Ajoutez des plats pour passer une commande.</h2>
      ) : (
        <Row>
          <Col md={6}>
            <Card className="my-3">
              <Card.Header>
                <h2>Order Summary</h2>
              </Card.Header>
              <Card.Body>
                <ul>
                  {cart.map((item) => (
                    <li key={item._id}>
                      {item.nom} - {item.prix}€ - {item.quantity}
                    </li>
                  ))}
                </ul>

                {/* Display the total price, delivery fee, and final price */}
                <div className="final-price">
                  <p>Total Price: {parseFloat(totalPrice).toFixed(2)}€</p>
                  <p>Delivery Fee (5%): {(parseFloat(totalPrice) * deliveryFeePercentage).toFixed(2)}€</p>
                  <p>Final Price: {finalPrice.toFixed(2)}€</p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="my-3">
              <Card.Header>
                <h2>Delivery Address</h2>
              </Card.Header>
              <Card.Body>
                {/* Your position details rendering code here */}
                <ProgressBar now={50} label={`50%`} className="mt-3" />

                <MapComponent
                  apiKey={apiKey}
                  center={center}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  handleAddressChange={handleAddressChange}
                  handleSearch={handleSearch}
                  onPositionChange={setPosition}
                />

                <Button variant="primary" onClick={handleValidation} className="mt-3">
                  Validate Order
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Button variant="primary" onClick={handleValidation}>
        Validate Order
      </Button>
    </Container>
  );

};

export default Order;
