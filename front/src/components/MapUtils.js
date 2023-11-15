// MapUtils.js
import axios from 'axios';

export const getCoordinatesFromAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=AIzaSyADfAV-7und2u2Ex3IYD2VRW4HulKn0Ujg`
    );

    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error('Aucune coordonnée trouvée pour cette adresse.');
    }
  } catch (error) {
    throw new Error('Erreur lors de la récupération des coordonnées.');
  }
};
