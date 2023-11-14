const mongoose = require('mongoose');

const PlatsSchema = new mongoose.Schema({
  nom: {
    type: String,
    unique: true,
  },
  prix: {
    type: Number,
  },
  ingredients: {
    type: [String],
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
  image: {
    type: String,
  },
}, { versionKey: false });

module.exports = mongoose.model('Plats', PlatsSchema, 'Plats');
