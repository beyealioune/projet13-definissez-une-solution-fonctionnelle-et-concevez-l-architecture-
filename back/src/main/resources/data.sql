-- Création de la base de données
CREATE DATABASE IF NOT EXISTS location_voitures;
USE location_voitures;

-- Table Utilisateur
CREATE TABLE Utilisateur (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    date_naissance DATE NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    adresse VARCHAR(255) NOT NULL
);

-- Table Voiture
CREATE TABLE Voiture (
    voiture_id INT AUTO_INCREMENT PRIMARY KEY,
    marque VARCHAR(255) NOT NULL,
    modele VARCHAR(255) NOT NULL,
    annee INT NOT NULL,
    categorie VARCHAR(255) NOT NULL,
    prix_par_jour DECIMAL(10, 2) NOT NULL,
    agence_id INT NOT NULL,
    FOREIGN KEY (agence_id) REFERENCES Agence(agence_id)
);

-- Table Agence
CREATE TABLE Agence (
    agence_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    ville VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL
);

-- Création de la table Adresse
CREATE TABLE Adresse (
    adresse_id INT AUTO_INCREMENT PRIMARY KEY,
    rue VARCHAR(255) NOT NULL,
    code_postal VARCHAR(20) NOT NULL,
    agence_id INT,
    parent_adresse_id INT,
    FOREIGN KEY (agence_id) REFERENCES Agence(agence_id),
    FOREIGN KEY (parent_adresse_id) REFERENCES Adresse(adresse_id)
);

-- Table Réservation
CREATE TABLE Réservation (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    voiture_id INT NOT NULL,
    date_debut DATETIME NOT NULL,
    date_fin DATETIME NOT NULL,
    ville_depart VARCHAR(255) NOT NULL,
    ville_arrivee VARCHAR(255) NOT NULL,
    tarif DECIMAL(10, 2) NOT NULL,
    statut ENUM('Réservée', 'Annulée', 'Complète') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Utilisateur(user_id),
    FOREIGN KEY (voiture_id) REFERENCES Voiture(voiture_id)
);

-- Table Interaction
CREATE TABLE Interaction (
    interaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date_interaction DATETIME NOT NULL,
    type ENUM('Chat', 'Message', 'Appel') NOT NULL,
    contenu TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Utilisateur(user_id)
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_user_id_reservation ON Réservation(user_id);
CREATE INDEX idx_voiture_id_reservation ON Réservation(voiture_id);
CREATE INDEX idx_user_id_interaction ON Interaction(user_id);
