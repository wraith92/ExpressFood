// AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/';

const AuthService = {
    login: async ({ email, motDePasse }) => {
        try {
            const response = await axios.post(API_URL + 'api/auth/login', {
                email,
                motDePasse,
            });

            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        } catch (error) {
            // Gérer l'erreur ici, par exemple en lançant une nouvelle erreur ou en retournant un objet d'erreur standardisé.
            throw error;
        }
    },
    logout: () => {
        localStorage.removeItem('user');
    }
};


export default AuthService;