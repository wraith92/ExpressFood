import axios from "axios";
import { addToken } from "../midelware/config";

const API_URL = "http://localhost:8080/api/";


const UserService = {
    getUsers: () => {
        return axios.get(API_URL + "users", addToken());
    },
    getUserById: (id) => {
        return axios.get(API_URL + "users/" + id,   addToken());
    },
    createUser: (user) => {
        return axios.post(API_URL + "users/CreateUser", user, addToken());
    },
    updateUser: (id, user) => {
        return axios.put(API_URL + "users/" + id, user, addToken());
    },
    deleteUser: (id) => {
        return axios.delete(API_URL + "users/" + id, addToken());
    },
    livreurProche: (id) => {
        return axios.get(API_URL + "users/livreurProche/" + id, addToken());
    },
    };

export default UserService;

