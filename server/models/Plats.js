const mongoose = require('mongoose');

const PlatsSchema = new mongoose.Schema({
  nom: {
    type: String,
    unique: true
  },
  prix: {
    type: Number,
  },
  ingredients: {
    type: [String],
    unique: true
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  quantite: {
    type: Number,
  },
}, { versionKey: false });

module.exports = mongoose.model('Plats', PlatsSchema, 'Plats');