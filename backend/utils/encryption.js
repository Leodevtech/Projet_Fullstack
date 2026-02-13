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
 * @param {string} password  - Le mdp en clair
 * @returns {string} - Chaine chiffré à stocker
 */

export const encryptPassword = (password) => {
  // Génère un iv (vecteur d'init) aléatoire pour plus de sécurité
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(ALGORITHM, KEY, id);

  // Chiffrement du mot de passe
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Tag d'authentification, protège des modifs
  const authTag = cipher.getAuthTag().toString("hex");

  // On retourne tout dans un seul string séparé par ":" pour le stocké
  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
};

/**
 * Décchifre le mot de passe pour l'afficher à l'utilisateur
 * @param {string} encryptedString - chaîne stockée
 * @returns {string} - Le mot de passe en clair
 */

export const decryptPassword = (encryptedString) => {
  // on sépare les 3 parties : IV + authTage + Données chiffrées
  const [ivHex, authTagHex, encryptedHex] = encryptedString.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
