import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  height: '400px',
  width: '100%',
};

const MapComponent = ({ apiKey, center, onLoad, onUnmount, handleAddressChange, handleSearch, onPositionChange }) => {
  const [address, setAddress] = useState('');
  const [map, setMap] = useState(null);

  const handleAddressChangeLocal = useCallback((e) => {
    setAddress(e.target.value);
    handleAddressChange(e);  // Call the provided handleAddressChange function
  }, [handleAddressChange]);

  const handleSearchLocal = useCallback(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher une adresse"
        value={address}
        onChange={handleAddressChangeLocal}
      />
      <button onClick={handleSearchLocal}>Rechercher</button>

      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={onPositionChange} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
