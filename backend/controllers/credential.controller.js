import { encryptPassword, decryptPassword } from "../utils/encryption.js";
import {
  createCredential,
  getCredentialsByUserId,
  deleteCredential,
} from "../models/credential.model.js";

/**
 * Ajoute un nouvel identifiant
 * cette fonction sera apeller quand l'user clique sur "Enregistrer"
 */

export const addCredential = async (req, res) => {
  try {
    const { service, email, password, notes } = req.body;

    // Validation basique des champs obligatoire
    if (!service || !email || !password) {
      return res.status(400).json({
        message: "Les champs service, username et password sont obligatoire",
      });
    }

    // Chiffrage du mdp avant de le stocker
    const encryptedPassword = encryptPassword(password);

    const id = await createCredential(
      req.user.id,
      service,
      email,
      encryptedPassword,
      notes,
    );

    res.status(201).json({
      message: "Identifiants enregistrés avec succès",
      id,
    });
  } catch (error) {
    console.error("Erreur addCredential :", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de l'enregistrement" });
  }
};

/**
 * Récupère tous les identifiants de l'user connecté
 * c'est cette fonction qui est appelée quand on charge la page /Home
 */

export const getMyCredentials = async (req, res) => {
  try {
    // on récupère les données chiffrés depuis la base
    const credentials = await getCredentialsByUserId(req.user.id);

    // on déchiffre chaque mot de passe avant de renvoyer au frontend
    const result = credentials.map((cred) => ({
      id: cred.id,
      service: cred.service,
      email: cred.email,
      password: decryptPassword(cred.encrypted_password), // Mot de passe enc lair
      notes: cred.notes || "",
      created_at: cred.created_at,
    }));

    res.json(result); // on renvoi les données au frontend
  } catch (error) {
    console.error("Erreur getMyCredentials :", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la récupération " });
  }
};

/**
 * Suppression d'un indentifiant
 * On vérifie que l'user et bien le proprio
 */
export const deleteMyCredential = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteCredential(Number(id), req.user.id);
    if (deleted === 0) {
      return res
        .status(404)
        .json({ message: "Identifiant non trouvé ou non autorisé " });
    }

    res.json({ message: "Identifiant supprimé avec succès " });
  } catch (error) {
    console.error("Erreur deleteMyCredential :", error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression " });
  }
};
