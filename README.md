# Nom du projet

PROJECT="backend"
echo "Création du projet $PROJECT..."
mkdir $PROJECT
cd $PROJECT || exit

# auth_nodemailer_project

backend/
├─ package.json
├─ .env
├─ server.js
├─ app.js
├─ config/
│ └─ db.js
├─ models/
│ └─ user.model.js
├─ middleware/
│ ├─ auth.middleware.js
│ └─ validation.middleware.js
├─ controllers/
│ └─ auth.controller.js
├─ routes/
│ └─ auth.routes.js
└─ services/
└─ mailer.service.js

# Initialisation npm

echo "Initialisation npm..."
npm init -y

# Installation modules

echo "Installation des modules..."
npm install express mysql2 dotenv jsonwebtoken argon2 nodemailer uuid zod validator
npm install -D nodemon

# Création structure des dossiers

echo "Création des dossiers..."
mkdir config models controllers routes middleware services

# Création des fichiers principaux

echo "Création des fichiers principaux..."
touch .env server.js app.js

# Création fichiers config

touch config/db.js config/mailer.js

# Création modèles

touch models/user.model.js

# Création middleware

touch middleware/auth.middleware.js middleware/validation.middleware.js

# Création controllers

touch controllers/auth.controller.js

# Création routes

touch routes/auth.routes.js

# Création services

touch services/mailer.service.js

# Ajout contenu minimal dans .env

cat <<EOL > .env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=auth_db

JWT_SECRET=uneCleSecreteSuperSecurisee
JWT_EXPIRES_IN=1d

BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=a
BREVO_SMTP_PASS=

echo "Structure initialisée et .env créé."
echo "Vous pouvez maintenant remplir vos fichiers avec le code fourni."
echo "Pour lancer le serveur en dev : npx nodemon server.js"
