import React, { useEffect, useState, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import MapComponent from '../components/MapComponent';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const [position, setPosition] = useState(null);
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState('');
  const apiKey = "AIzaSyADfAV-7und2u2Ex3IYD2VRW4HulKn0Ujg";
  const center = { lat: 37.7749, lng: -122.4194 };
  const navigate = useNavigate();

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

  const handleValidation = () => {
    const userIsConnected = true; // Replace this with your actual logic to check user authentication

    if (userIsConnected) {
      alert('Order Validated!'); // Replace this with your actual logic
      localStorage.removeItem('cart');
      navigate('/');
    }
  };

  return (
    <Container>
      <h2>Order Summary</h2>
      {cart ? (
        <div>
          {cart.map((item, index) => (
            <div key={index}>
              <p>
                {item.nom} x{item.quantity} - Prix: {(item.prix * item.quantity).toFixed(2)} €
              </p>
            </div>
          ))}
          <h4>Total: {cart.reduce((total, item) => total + item.prix * item.quantity, 0).toFixed(2)} €</h4>

          <MapComponent
            apiKey={apiKey}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
            handleAddressChange={handleAddressChange}
            handleSearch={handleSearch}
            onPositionChange={position}
          />

          {position && (
            <div>
              <h4>Adresse de livraison:</h4>
              <p>Latitude: {position.lat}</p>
              <p>Longitude: {position.lng}</p>
            </div>
          )}

          <Button variant="primary" onClick={handleValidation}>
            Validate Order
          </Button>
        </div>
      ) : (
        <p>Votre panier est vide.</p>
      )}
    </Container>
  );
};

export default Order;
