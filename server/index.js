const express = require('express');
const cors = require('cors');  // Ajout de la ligne pour importer le middleware cors
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

// Middleware pour permettre CORS
app.use(cors());

// Middleware pour servir les fichiers statiques depuis le dossier public
app.use(express.static('public'));

// Route pour renvoyer les données des utilisateurs depuis users.json
app.get('/api/users', (req, res) => {
  // Lire les données depuis users.json
  const usersData = fs.readFileSync(path.join(__dirname, '/data/user.json'), 'utf-8');
  const users = JSON.parse(usersData);

  res.json(users);
});

app.get('/api/plats', (req, res) => {
  // Lire les données depuis users.json
  const platsData = fs.readFileSync(path.join(__dirname, '/data/plat.json'), 'utf-8');
  const plats = JSON.parse(platsData);

  res.json(plats);
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
