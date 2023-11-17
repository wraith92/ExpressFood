// src/service/PlatService.js
import axios from 'axios';
import { addToken } from '../midelware/config';

const API_URL = 'http://localhost:8080/api/';

const PlatService = {
    getPlat: () => {
        return axios.get(API_URL + 'plats', addToken());
    },
    getPlatById: (id) => {
        return axios.get(API_URL + 'plats/' + id, addToken());
    },
    createPlat: (plat) => {
        return axios.post(API_URL + 'plats', plat, addToken());
    },
    updatePlat: (id, plat) => {
        return axios.put(API_URL + 'plats/' + id, plat, addToken());
    },
    deletePlat: (id) => {
        return axios.delete(API_URL + 'plats/' + id, addToken());
    },
    getPlatJoure: () => {
        return axios.get(API_URL + 'plats/PlatsDeJour' ,addToken());
    }
};

export default PlatService;
