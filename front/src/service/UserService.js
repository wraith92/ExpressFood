import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const UserService = {
    getUsers: () => {
        return axios.get(API_URL + "users");
    },
    getUserById: (id) => {
        return axios.get(API_URL + "users/" + id);
    },
    createUser: (user) => {
        return axios.post(API_URL + "users/CreateUser", user);
    },
    updateUser: (id, user) => {
        return axios.put(API_URL + "users/" + id, user);
    },
    deleteUser: (id) => {
        return axios.delete(API_URL + "users/" + id);
    },
    livreurProche: (id) => {
        return axios.get(API_URL + "users/livreurProche/" + id);
    },
    };

export default UserService;

