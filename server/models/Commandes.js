const mongoose = require('mongoose');

const CommandesSchema = new mongoose.Schema({
  plats: [
    {
      plat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plats',
        required: true
      },
      quantite: {
        type: Number,
        required: true
      }
    }
  ],
  livreur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  date: {
    type: Date,
    default: Date.now
  },
  statut: {
    type:String
  }
}, { versionKey: false });

module.exports = mongoose.model('Commandes', CommandesSchema, 'Commandes');
