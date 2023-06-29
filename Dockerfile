# Utiliser une image de base avec Node.js préinstallé
FROM node:latest

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Définir la commande par défaut pour exécuter l'application
CMD ["npm", "start"]