// src/service/PlatService.js
import axios from 'axios';
import { addToken } from '../midelware/config';
const API_URL = 'https://express-food.vercel.app/api/' || 'https://express-food.vercel.app/api/';
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
        return axios.get(API_URL + 'plats/PlatsDeJour' );
    }
};

export default PlatService;
