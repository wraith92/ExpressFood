require('dotenv').config()
const express = require('express');
let cors = require('cors');

// routes
const Users = require('./routes/api/users');
const Auth = require('./routes/api/authentification');
const Plats = require('./routes/api/plats');
const Commandes = require('./routes/api/commandes');

const app = express();

// connexion BDD
const connectDB = require('./db/conn.js');

app.use(express.json());
app.use(cors()); // 'middleware' autorise les requêtes provenant de n'importe quel domaine.

// Connect Database
connectDB();

app.use('/api/users', Users);
app.use('/api/auth', Auth);
app.use('/api/plats', Plats);
app.use('/api/commandes', Commandes);


app.listen(3000, () => {
    console.log("Serveur à l'écoute");
});
