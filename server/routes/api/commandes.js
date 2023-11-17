const express = require('express');
const router = express.Router();
const commandes = require('../../models/Commandes');
const plats = require('../../models/Plats');
const { verifyToken } = require('./jwt');

router.get('/commandesAujourdhui', verifyToken, (req, res) => {
  const today = new Date();
  console.log(today)
  today.setHours(0,59,59,999)
  commandes.find({ date: { $gte: today } })
    .then(commandes => res.json(commandes))
    .catch(err => res.status(404).json({ nocommandesFound: 'Pas de commandes trouvées aujourd\'hui...' }));
});

router.get('/client/:clientId', verifyToken, (req, res) => {
  const clientId = req.params.clientId;

  commandes.find({ client: clientId })
    .then(commandes => res.json(commandes))
    .catch(err => res.status(404).json({ nocommandesFound: 'Pas de commandes trouvées pour ce client...' }));
});

router.get('/livreur/:livreurId', verifyToken, (req, res) => {
  const livreurId = req.params.livreurId;

  commandes.find({ livreur: livreurId })
    .then(commandes => res.json(commandes))
    .catch(err => res.status(404).json({ nocommandesFound: 'Pas de commandes trouvées pour ce livreur...' }));
});

router.get('/', (req, res) => {
  commandes.find()
    .then(commandes => res.json(commandes))
    .catch(err => res.status(404).json({ nocommandesFound: 'Pas de commandes trouvés...' }));
});

router.get('/:id', (req, res) => {
  commandes.findById(req.params.id)
    .then(commande => res.json(commande))
    .catch(err => res.status(404).json({ commandeNotFound: 'commande non trouvé...' }));
});

router.get('/statut/:statut', verifyToken, (req, res) => {
  const statut = req.params.statut;

  commandes.find({ statut: statut })
    .then(commandes => res.json(commandes))
    .catch(err => res.status(404).json({ nocommandesFound: 'Pas de commandes trouvées pour ce statut...' }));
});

router.post('/Createcommande', async (req, res) => {
  try {
    if (!req.body.plats || !Array.isArray(req.body.plats)) {
      return res.status(400).json({ error: 'Données d\'entrée invalides' });
    }
    await commandes.create(req.body);

    const decrementPromises = req.body.plats.map(async (plat) => {
      const plat1 = await plats.findById(plat.plat);
      if (plat1) {
        plat1.quantite -= plat.quantite;
        await plat1.save();
      }
    });

    await Promise.all(decrementPromises);

    res.json({ msg: 'Commande bien ajoutée !' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Impossible d\'ajouter la commande' });
  }
});

router.put('/:id', (req, res) => {
  commandes.findByIdAndUpdate(req.params.id, req.body)
    .then(commande => res.json({ msg: 'commande bien modifié!' }))
    .catch(err => res.status(400).json({ error: 'Erreur lors de la mise à jour du commande...' }));
});


router.delete('/:id', verifyToken, (req, res) => {
  commandes.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: 'commande supprimé avec succès' }))
    .catch(err => res.status(404).json({ commandeNotFound: 'commande non trouvé...' }));
});

router.put('/modifierStatut/:idCommande', async (req, res) => {
  try {
    const commandeId = req.params.idCommande;
    const newStatut = req.body.statut;

    const commande = await Commandes.findById(commandeId);
    if (!commande) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }

    commande.statut = newStatut;
    await commande.save();

    res.json({ success: true, message: 'Statut de la commande mis à jour avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la modification du statut de la commande' });
  }
});


router.put('/decrementerQuantite/:idCommande', verifyToken, async (req, res) => {
  try {
    const commandeId = req.params.idCommande;

    const commande = await commandes.findById(commandeId);
    if (!commande) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }

    for (const plat of commande.plats) {
      const platId = plat.plat;
      const quantiteCommandee = plat.quantite;

      const platExistant = await plats.findById(platId);
      if (!platExistant) {
        return res.status(404).json({ error: 'Plat non trouvé' });
      }

      platExistant.quantite -= quantiteCommandee;
      await platExistant.save();
    }

    res.json({ success: true, message: 'Quantité des plats décrémentée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la décrémentation de la quantité des plats' });
  }
});

module.exports = router;
