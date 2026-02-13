import { db } from "../config/db.js";

// model pour la création d'idd

export const createCedential = async (
  userId,
  service,
  username,
  encryptedPassword,
  notes = null,
) => {
  const [result] = await db.query(
    "INSERT INTO credentials (user_id, service, username, encryptedPassword, notes) VALUES (?, ?, ?, ?, ?)",
    [userId, service, username, encryptedPassword, notes],
  );
  return result.insertId;
};

/**
 * Récupère tous les identifiaints d'un utilisateur connecté
 * on filtre par user_id pour des raison de sécu
 */

export const getCredentialsByUserId = async (userId) => {
  const [rows] = await db.query(
    `SELECT id, service, username, encrypted_password, notes, created_at
    FROM credentials
    WHERE user_id = ?
    ORDER BY created_at DESC`,
    [userId],
  );
  return rows;
};

/**
 * Supprime un identifiant
 * On vérifie que l'utilisateur est bien le propriétaire (user_id)
 */
export const deleteCredential = async (id, userId) => {
  const [result] = await db.query(
    "DELETE FROM credentials WHERE id = ? AND user_id = ?",
  );
  return result.affectedRows; // Retourne 1 si supprimé, 0 sinon
};
