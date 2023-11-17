Le fichier README est une documentation essentielle qui accompagne notre  projet, offrant aux utilisateurs et aux développeurs une orientation claire sur la façon de comprendre, configurer et exécuter le code source. Il agit comme un guide d'utilisation et de contribution pour tous ceux qui interagiront avec votre application ou votre service. Dans ce fichier, vous trouverez des informations cruciales telles que les étapes pour lancer le projet, les dépendances nécessaires, la configuration de la base de données, ainsi que des liens vers des ressources externes importantes, comme un tableau Trello pour suivre les tâches, et une présentation des résultats. 
# Lancement du Projet
1 - **Cloner le Projet:**

git clone ‘lien vers notre repo’

2. **Installer les Dépendances:**
- Accédez au dossier "server" et exécutez la commande suivante :
  cd server
  npm install

- Accédez au dossier "front" et exécutez la commande suivante :
  cd front
  npm install

3. **Lancer l'API:**
- Dans le dossier "server", exécutez l'une des commandes suivantes :
  nodemon  ou  npm start

4. **Tester les Routes avec Postman:**
- Assurez-vous que l'API est en cours d'exécution.
- Importez la collection Postman fournie dans le dossier "postman" pour tester les différentes routes.

5. **Lancer le Frontend:**
- Dans le dossier "front", exécutez la commande suivante : npm start


6. **Base de Données:**

### MongoDB Atlas

Ce projet utilise MongoDB Atlas comme système de gestion de base de données. 
MongoDB Atlas est un service cloud de base de données MongoDB entièrement géré qui offre une fiabilité,
 une sécurité et une évolutivité élevées pour les applications modernes.

# Trello: Répartition des Tâches
- [Lien vers le Trello] => https://trello.com/b/4KDunMl7/projet-expressfood
Suivez notre progression et la répartition des tâches sur le tableau Trello. 

# Présentation
- [Support de Présentation] => https://www.canva.com/design/DAF0Vc9PepA/AVFjYb7e8pyP2upZ1mWtgg/edit?utm_content=DAF0Vc9PepA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
Consultez notre présentation pour obtenir un aperçu des principaux résultats du projet.


/// des utilisateurs pour tester l'application
{
    "email": "jane.smith@gmail.com",
    "motDePasse": "123456789",
    "role": "client",
  }
  {
    "email": "alice.martin@gmail.com",
    "motDePasse": "123456789",
    "role": "livreur",
  }
  {
    "email": "paul.dupont@gmail.com",
    "motDePasse": "123456789",
    "role": "client",
  }
  {
    "email": "maria.garcia@gmail.com",
    "motDePasse": "123456789", 
    "role": "admin",
  }
  {
    "email": "li.chen@gmail.com",
    "motDePasse": "123456789",
    "role": "livreur",
  },
  {
    "email": "robert.johnson@gmail.com",
    "motDePasse": "123456789",
  },
  {
    "email": "soo.kim@gmail.com",
    "motDePasse": "123456789",
  },
  {
    "email": "carlos.lopez@gmail.com",
    "motDePasse": "123456789",
    "role": "client",
  },
  {
    "email": "fatima.ahmed@gmail.com",
    "motDePasse": "123456789",
    "role": "livreur",
  }

  // le calcul de la distance
  Pour calculer la distance entre un livreur et un client en se basant sur leurs coordonnées 
  de latitude et de longitude, vous pouvez utiliser la formule haversine. 
  Cette formule prend en compte la courbure de la Terre pour fournir une estimation 
  plus précise de la distance entre deux points géographiques. La formule convertit 
  d'abord les coordonnées de degrés en radians, puis utilise la différence de latitudes 
  et de longitudes pour calculer la distance sur la sphère terrestre. Enfin, la distance 
  est obtenue en multipliant le résultat par le rayon de la Terre (en kilomètres). 
  Vous pouvez intégrer cette formule dans votre application pour déterminer la distance 
  entre le livreur et le client.

  => http://villemin.gerard.free.fr/aGeograp/Distance.htm

Déploiement :

Back-end :Notre backend a récemment été déployé avec succès sur Vercel, une plateforme de déploiement 
moderne et efficace. Vercel offre une solution intégrée qui simplifie le processus de déploiement, 
garantissant une gestion aisée de notre infrastructure backend. Cette plateforme se distingue par 
sa facilité d'utilisation, sa scalabilité instantanée, et ses fonctionnalités de déploiement continu. 
En optant pour Vercel, nous nous assurons que notre application bénéficie d'une performance optimale
et que les mises à jour sont rapidement intégrées.
Cette démarche s'inscrit dans notre engagement envers l'amélioration constante de l'expérience utilisateur,
en exploitant les avantages offerts par des solutions de déploiement modernes comme Vercel.

lien => la majorité des routes sont sécurisées (token), on a cette route qui est acceccible par tout le monde.
https://express-food.vercel.app/api/plats/
