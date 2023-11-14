const express = require('express');
const router = express.Router();
const plats = require('../../models/Plats');
const jwtSecret = 'ma_cle_secrete'; 
const { verifyToken } = require('./jwt');

router.get('/', (req, res) => {
  plats.find()
    .then(plats => res.json(plats))
    .catch(err => res.status(404).json({ noplatsFound: 'Pas de plats trouvés...' }));
});

router.get('/:id', verifyToken, (req, res) => {
  plats.findById(req.params.id)
    .then(plat => res.json(plat))
    .catch(err => res.status(404).json({ platNotFound: 'plat non trouvé...' }));
});


router.post('/Createplat', verifyToken, (req, res) => {
  plats.create(req.body)
    .then(plat => res.json({ msg: 'plat bien ajouté !' }))
    .catch(err => res.status(400).json({ error: 'Impossible d\'ajouter le plat' }));
});

router.put('/:id', verifyToken, (req, res) => {
  plats.findByIdAndUpdate(req.params.id, req.body)
    .then(plat => res.json({ msg: 'plat bien modifié!' }))
    .catch(err => res.status(400).json({ error: 'Erreur lors de la mise à jour du plat...' }));
});

router.put('/', verifyToken, async (req, res) => {
  console.log(req.body);
  try {
    for (const plat of req.body) {
      const { _id, quantite } = plat;

      const result = await plats.updateOne(
        { _id: _id },
        { $set: { quantite: quantite } }
      );

      if (result.nModified > 0) {
        console.log(`Plat avec l'ID ${_id} mis à jour`);
      } else {
        console.log(`Aucune mise à jour pour le plat avec l'ID ${_id}`);
      }
    }

    res.json({ message: 'plat mis à jour avec succès' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour des plats' });
  }
});


router.delete('/:id', verifyToken, (req, res) => {
  plats.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: 'plat supprimé avec succès' }))
    .catch(err => res.status(404).json({ platNotFound: 'plat non trouvé...' }));
});

module.exports = router;