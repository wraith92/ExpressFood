const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  motDePasse: {
    type: String,
    required: true,
  },
  role: {
    type: String
  },
  statut: {
    type: String
  },
  position: {
    type: String
  }

}, { versionKey: false });

module.exports = mongoose.model('Users', UsersSchema, 'Users');