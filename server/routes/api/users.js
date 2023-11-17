const express = require('express');
const router = express.Router();
const Users = require('../../models/Users');
const {verifyToken } = require('./jwt');
const bcrypt = require('bcrypt');
const {haversineDistance} = require('./geolocation')

router.get('/',verifyToken, (req, res) => {
  Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersFound: 'Pas de users trouvés...' }));
});

router.get('/:id', verifyToken, (req, res) => {
  Users.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ userNotFound: 'Utilisateur non trouvé...' }));
});

router.post('/CreateUser', (req, res) => {
  Users.create(req.body)
    .then(user => res.json({ msg: 'User bien ajouté !' }))
    .catch(err => res.status(400).json({ error: 'Impossible d\'ajouter l\'user '}));
});

router.get('/email/:email', verifyToken, (req, res) => {
  const email = req.params.email;
  Users.find({ email: email })
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ noUsersFound: 'Pas d\'utilisateur trouvé avec cet email...' }));
});

router.get('/nom/:nom', verifyToken, (req, res) => {
  const nom= req.params.nom;
  Users.find({ nom: nom })
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ noUsersFound: 'Pas d\'utilisateur trouvé avec ce nom...' }));
});

router.get('/prenom/:prenom', verifyToken, (req, res) => {
  const prenom= req.params.prenom;
  Users.find({prenom: prenom})
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ noUsersFound: 'Pas d\'utilisateur trouvé avec cet prénom...' }));
});

router.put('/:id', (req, res) => {
  Users.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({ msg: 'Utilisateur bien modifié!' }))
    .catch(err => res.status(400).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur...' }));
});

router.delete('/:id', (req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: 'Utilisateur supprimé avec succès' }))
    .catch(err => res.status(404).json({ userNotFound: 'Utilisateur non trouvé...' }));
});

router.put('/password/:id', verifyToken, (req, res) => {
  const userId = req.params.id;
  const { oldPassword, newPassword } = req.body;
  Users.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ noUserFound: 'Utilisateur introuvable.' });
      }
      bcrypt.compare(oldPassword, user.motDePasse)
        .then(match => {
          if (!match) {
            return res.status(401).json({ incorrectPassword: 'Mot de passe incorrect.' });
          }
          bcrypt.hash(newPassword, 10)
            .then(hashedPassword => {
              user.motDePasse = hashedPassword;
              user.save()
                .then(updatedUser => {
                  res.json({ msg: 'Utilisateur bien modifié!' })
                })
                .catch(err => {
                  res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour du mot de passe.' });
                });
            })
            .catch(err => {
              res.status(500).json({ error: 'Une erreur s\'est produite lors du hachage du nouveau mot de passe.' });
            });
        })
        .catch(err => {
          res.status(500).json({ error: 'Une erreur s\'est produite lors de la comparaison des mots de passe.' });
        });
    })
    .catch(err => {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la recherche de l\'utilisateur.' });
    });
});

router.post('/addAddress/:userId', verifyToken, (req, res) => {
  const userId = req.params.userId;

  Users.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      user.adresses.push(req.body.adresse);

      return user.save();
    })
    .then(updatedUser => {
      res.json({ msg: 'Adresse ajoutée avec succès', user: updatedUser });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'adresse' });
    });
});


router.get('/livreurProche/:clientId', verifyToken, async (req, res) => {
  try {
    const clientId = req.params.clientId;

    const client = await Users.findById(clientId);
    if (!client || client.role !== 'client') {
      return res.status(404).json({ error: 'Client non trouvé' });
    }

    const clientLatitude = client.position.latitude;
    const clientLongitude = client.position.longitude;

    const livreursLibres = await Users.find({
      role: 'livreur',
      statut: 'libre',
      'position.latitude': { $exists: true },
      'position.longitude': { $exists: true }
    });

    if (!livreursLibres || livreursLibres.length === 0) {
      return res.status(404).json({ error: 'Aucun livreur libre trouvé' });
    }

    const livreursAvecDistance = livreursLibres.map(livreur => {
      const livreurLatitude = livreur.position.latitude;
      const livreurLongitude = livreur.position.longitude;
      const distance = haversineDistance(clientLatitude, clientLongitude, livreurLatitude, livreurLongitude);

      return {
        livreur,
        distance,
      };
    });

    livreursAvecDistance.sort((a, b) => a.distance - b.distance);

    const livreurProche = livreursAvecDistance[0].livreur;
    res.json({ livreurProche});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la recherche du livreur' });
  }
});

router.put('/modifierStatut/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const newStatut = req.body.statut;

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    if (user.role !== 'livreur') {
      return res.status(400).json({ error: 'L\'utilisateur n\'a pas le rôle de livreur' });
    }

    user.statut = newStatut;
    await user.save();

    res.json({ success: true, message: 'Statut mis à jour avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la modification du statut de l\'utilisateur' });
  }
});

module.exports = router;

