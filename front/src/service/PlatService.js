import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

const PlatService = {
    getPlat: () => {
        return axios.get(API_URL + 'plats');
    },
    getPlatById: (id) => {
        return axios.get(API_URL + 'plats/' + id);
    },
    createPlat: (plat) => {
        return axios.post(API_URL + 'plats', plat);
    },
    updatePlat: (id, plat) => {
        return axios.put(API_URL + 'plats/' + id, plat);
    },
    deletePlat: (id) => {
        return axios.delete(API_URL + 'plats/' + id);
    },
};

export default PlatService;