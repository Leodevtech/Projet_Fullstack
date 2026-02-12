import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";

const KEY = Buffer.from(process.env.ENCRYPTION_SECRET, "hex");

if (KEY.length !== 32) {
  throw new Error(
    "ENCRYPTION_SECRET doit être une chaîne hexadécimal de 64 caractères",
  );
}

/**
 * Chiffre le mot de passe en clair
 * @param {string} password
 * @returns {string}
 */

export const encryptPassword = (password) => {
  // Génère un iv (vecteur d'init) aléatoire pour plus de sécurité
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(ALGORITHM, KEY, id);

  // Chiffrement du mot de passe
  let encrypted = cipher.update;
};
