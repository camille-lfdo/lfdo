# README

## lien serveur test
acceder au serveur test pour visualiser le prototype.
(ne fonctionne pas sur chrome)

https://lfdo.rf.gd/

---

## Commandes de base GIT

```bash
# Ajouter tous les fichiers du projet à l'index (préparation au commit)
git add .

# Vérifier les fichiers ajoutés ou modifiés
git status

# Enregistrer les modifications dans l'historique avec un message
git commit -m "Premier commit"

# Envoyer les commits locaux vers le dépôt distant (branche principale)
git push -u origin main

# Récupérer les dernières modifications du dépôt distant
git pull

# Afficher l'historique des commits
git log

# Créer une nouvelle branche (exemple : develop)
git checkout -b develop

# Changer de branche
git checkout main

# Fusionner une branche (exemple : develop dans main)
git merge develop
```

---

# solution multi-utilisateur

Un serveur (backend) pour stocker les données de chaque utilisateur (par exemple avec Node.js, Python, PHP, etc.).  
Une base de données (MySQL, PostgreSQL, MongoDB, etc.) pour enregistrer les informations des jours et des utilisateurs. 
Un système d’authentification pour que chaque utilisateur ait son propre compte et ses propres données. 
Des requêtes AJAX (fetch, axios…) côté client pour communiquer avec le serveur (enregistrer, charger, modifier les jours).

#### Exemple de principe 
L’utilisateur se connecte (login/mot de passe). 
Le frontend envoie les modifications au serveur via une API (ex : /api/jours).  
Le serveur enregistre les jours dans la base de données, associés à l’utilisateur.  
À chaque connexion, le frontend récupère les jours de l’utilisateur via l’API.

#### Technologies courantes  
Backend : Node.js (Express), Python (Flask/Django), PHP, etc.   
Base de données : MongoDB, MySQL, PostgreSQL…
Frontend : HTML/JS (fetch ou axios pour les requêtes AJAX)  
Authentification : JWT, sessions, OAuth…
Exemple de flux (simplifié)    

L’utilisateur s’inscrit ou se connecte.
Le frontend reçoit un token/session.    
À chaque modification, le frontend envoie les données au serveur avec le token. 
Le serveur vérifie le token, puis sauvegarde ou renvoie les données de l’utilisateur.

```
/mon-calendrier
│
├── backend
│   ├── server.js
│   ├── models
│   │   ├── User.js
│   │   └── Jour.js
│   ├── routes
│   │   ├── auth.js
│   │   └── jours.js
│   └── package.json
│
└── frontend
    ├── index.html
    ├── app.js
    └── styles.css
```
---

## server.js
```js
    // ... Serveur Express de base ...
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const joursRoutes = require('./routes/jours');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/calendrier', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/auth', authRoutes);
app.use('/api/jours', joursRoutes);

app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));
```

## models/User.js
```js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: String,
    password: String // À hasher en production !
});
module.exports = mongoose.model('User', UserSchema);
```

models/Jour.js
```js
const mongoose = require('mongoose');
const JourSchema = new mongoose.Schema({
    userId: String,
    jour: Number,
    mois: Number,
    annee: Number,
    heureEmbauche: String,
    heureDebauche: String,
    dureePause: String
});
module.exports = mongoose.model('Jour', JourSchema);
```
## routes/auth.js
```js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Inscription
router.post('/register', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({ message: 'Utilisateur créé' });
});

// Connexion
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (!user) return res.status(401).json({ message: 'Identifiants invalides' });
    const token = jwt.sign({ userId: user._id }, 'SECRET');
    res.json({ token });
});

module.exports = router;
```

## app.js
```js
let token = null;

// Connexion
async function login(email, password) {
    const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    token = data.token;
}

// Sauvegarder un jour
async function sauvegarderJour(jourObj) {
    await fetch('http://localhost:3000/api/jours', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(jourObj)
    });
}

// Charger tous les jours
async function chargerJours() {
    const res = await fetch('http://localhost:3000/api/jours', {
        headers: { 'Authorization': token }
    });
    return await res.json();
}
```
---

## Aller plus loin

Hasher les mots de passe    
Sécuriser les routes    
Gérer les erreurs   
Ajouter la gestion des sessions côté frontend
