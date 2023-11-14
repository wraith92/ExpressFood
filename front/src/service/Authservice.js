// AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/';

const AuthService = {
    login: ({ email, motDePasse }) => {
        return axios.post(API_URL + 'api/auth/login', {
            email,
            motDePasse,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;

        });
    },

    logout: () => {
        localStorage.removeItem('user');
    }
};



export default AuthService;