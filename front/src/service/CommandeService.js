import	axios    from	'axios';


const API_URL = 'https://express-food.vercel.app/api/' || 'https://express-food.vercel.app/api/';

const CommandeService = {
    getCommandes: () => {
        return axios.get(API_URL + 'commandes');
    },
    getCommandeById: (id) => {
        return axios.get(API_URL + 'commandes/' + id);
    },
    createCommande: (commande) => {
        return axios.post(API_URL + 'commandes/CreateCommande', commande);
    },
    updateCommande: (id, commande) => {
        return axios.put(API_URL + 'commandes/' + id, commande);
    },
    deleteCommande: (id) => {
        return axios.delete(API_URL + 'commandes/' + id);
    },
};

export default CommandeService;