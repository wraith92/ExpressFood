import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  height: '400px',
  width: '100%',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const MapComponent = () => {
  const apiKey = "AIzaSyADfAV-7und2u2Ex3IYD2VRW4HulKn0Ujg";
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState(center);
  const [map, setMap] = useState(null);

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
  }, []);
console.log(position);
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher une adresse"
        value={address}
        onChange={handleAddressChange}
      />
      <button onClick={handleSearch}>Rechercher</button>

      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={position} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
