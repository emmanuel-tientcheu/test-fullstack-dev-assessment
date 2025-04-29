
# Projet Seminar Management

Ce projet permet de gérer des séminaires, d'affecter des formateurs à des cours, de suivre les participants, et d'envoyer des notifications par e-mail. Il utilise **NestJS** pour le backend et **SQLite** comme base de données.

## Prérequis

Avant de commencer, assurez-vous que vous avez installé les outils suivants :

- [Node.js](https://nodejs.org/) (version 14.x ou supérieure)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Prisma](https://www.prisma.io/docs/getting-started) (si vous n'avez pas encore installé Prisma, suivez les instructions sur leur site)

## Installation

### 1. Cloner le projet

Clonez ce projet dans votre répertoire local.

```bash
git clone <url_du_projet>
cd <nom_du_projet>
```

### 2. Installer les dépendances

Installez toutes les dépendances nécessaires pour le projet.

```bash
npm install
```

ou si vous utilisez **Yarn** :

```bash
yarn install
```

### 3. Configurer la base de données avec Prisma

Ce projet utilise **SQLite** comme base de données. Nous allons configurer Prisma pour qu'il puisse se connecter à une base SQLite locale.

#### Étape 1 : Configurer le fichier `.env`

Le fichier `.env` contient les informations de connexion à la base de données. Assurez-vous que le fichier `.env` se trouve à la racine du projet et qu'il contient la ligne suivante :

```env
DATABASE_URL="file:./dev.db"
```

Cela signifie que la base de données SQLite sera stockée dans un fichier appelé `dev.db` à la racine du projet.

#### Étape 2 : Générer le client Prisma

Une fois que vous avez configuré le fichier `.env`, générez le client Prisma :

```bash
npx prisma generate
```

#### Étape 3 : Appliquer les migrations

Prisma gère les migrations de base de données. Appliquez les migrations pour créer les tables nécessaires dans votre base de données SQLite.

```bash
npx prisma migrate dev --name init
```

#### Étape 4 : Lancer le serveur de mail
```bash
docker run -p 1025:1025 -p 8025:8025 axllent/mailpit
```

### 4. Lancer l'application

Maintenant que tout est configuré, vous pouvez démarrer votre application NextJS.

Cela va démarrer le serveur sur le port par défaut (3000), et vous pourrez accéder à l'API à l'adresse suivante : [http://localhost:3000](http://localhost:3000).

### 5. Accéder à l'API

L'API est maintenant prête à être utilisée. Vous pouvez tester les points de terminaison de votre API en envoyant des requêtes HTTP à [http://localhost:3000](http://localhost:3000) en utilisant un outil comme **Postman** ou **Insomnia**.


###  Scripts utiles

Voici quelques scripts npm utiles pour gérer le projet :

- **`npm run start`** : Lance l'application en production.
- **`npm run start:dev`** : Lance l'application en mode développement (avec `ts-node`).
- **`npm run build`** : Compile l'application pour la production.
- **`npm run test`** : Lance les tests unitaires.
- **`npm run prisma:generate`** : Générez le client Prisma.

---

## Dépannage

- Si vous rencontrez des problèmes lors de la génération du client Prisma, assurez-vous que le fichier `.env` est correctement configuré.
- Si Prisma ne peut pas se connecter à la base de données, vérifiez que la base de données SQLite a bien été créée dans le répertoire du projet (fichier `dev.db`).
- Pour toute erreur liée à `prisma migrate dev`, essayez de supprimer le fichier `dev.db` et réexécutez `npx prisma migrate dev --name init` pour recommencer à zéro.

---

