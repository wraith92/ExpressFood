import React, {  useState, useCallback,useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import MapComponent from '../components/MapComponent';
import { useNavigate } from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import axios from 'axios';
import { addCommandeAction } from '../action/CommandeAction';
import { updateUserAction , livreurProchAction } from '../action/UserAction';
import { useSelector } from 'react-redux';

const Order = () => {

  const cart = JSON.parse(localStorage.getItem('cart'));
  const user = JSON.parse(localStorage.getItem('user'));
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
      const response = await axios.get(`http://localhost:8080/api/users/livreurProche/${clientId}`);
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
      <h2>Order Summary</h2>
      {/* Your cart rendering code here */}

      <MapComponent
        apiKey={apiKey}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        handleAddressChange={handleAddressChange}
        handleSearch={handleSearch}
        onPositionChange={setPosition}
      />

      {/* Your position details rendering code here */}

      <Button variant="primary" onClick={handleValidation}>
        Validate Order
      </Button>
    </Container>
  );
};

export default Order;
