-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 12 fév. 2026 à 13:24
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `auth_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `credentials`
--

CREATE TABLE `credentials` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `service` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `encrypted_password` text NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('USER','ADMIN','MODERATOR') NOT NULL DEFAULT 'USER',
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `verify_token` varchar(36) DEFAULT NULL,
  `reset_token` varchar(36) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `role`, `is_verified`, `verify_token`, `reset_token`, `created_at`, `updated_at`) VALUES
(8, 'MomoLasticot@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$pEHgP2ZVZficFLZlmTML9Q$GQo4enESvadh/+wYu1Kjatqh7PT7Z/19WoC0rFaaX2w', 'USER', 0, 'fa3e4332-45fa-4f14-b604-760a45d51758', NULL, '2026-02-04 08:36:40', '2026-02-04 08:36:40'),
(9, 'lamem11757@cimario.com', '$argon2id$v=19$m=65536,t=3,p=4$SanO0M93UqvK5hIrlBYwzA$m+8F5OSKUhjrlsCdqjm194n9SOJxfE+XtVqocjNS/Ic', 'ADMIN', 1, NULL, NULL, '2026-02-04 12:27:50', '2026-02-04 12:34:18'),
(10, 'bob@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$ewmq6eYcWlCvrAZyQhoEhg$dLfYwC8uWCC28Y3rzgXkQ7/7O7dMCHAP5Wttlg2iSJk', 'USER', 0, '63bf26ae-016d-4820-a763-2731221a89f8', NULL, '2026-02-05 11:20:45', '2026-02-05 11:20:45'),
(11, 'leo@hhmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Zgnf16zGTlr7nz0xk2Q1kg$K1jO3qd0rGSu3q1lZ0DGDS5oBlXbOQZ9UexjflQ/pWA', 'USER', 0, '8bba4793-ea50-4bfa-8d20-0422bcf4fb16', NULL, '2026-02-05 11:24:52', '2026-02-05 11:24:52');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `credentials`
--
ALTER TABLE `credentials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_verify_token` (`verify_token`),
  ADD KEY `idx_reset_token` (`reset_token`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `credentials`
--
ALTER TABLE `credentials`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `credentials`
--
ALTER TABLE `credentials`
  ADD CONSTRAINT `credentials_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
