import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

const PlatService = {
    getPlat: () => {
        return axios.get(API_URL + 'plats');
    },
};

export default PlatService;