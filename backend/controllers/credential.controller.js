import { encryptPassword, decryptPassword } from "../utils/encryption.js";
import {
  createCredential,
  getCredentialsByUserId,
  deleteCredential,
} from "../models/credential.model.js";
import { findUserById } from "../models/user.model.js";

const deriveEncryptionKey = (masterPassword) => {
  // Salt fixe

  const salt = Buffer.from("vault-salt-hackhaton-leo-super-secret", "utf8");
  return crypto.pbkdf2Sync(masterPassword, salt, 100000, 32, "sha512");
};

/**
 * Ajoute un nouvel identifiant
 * cette fonction sera apeller quand l'user clique sur "Enregistrer"
 */

export const addCredential = async (req, res) => {
  try {
    const { service, email, password, notes, masterPassword } = req.body;

    // Validation basique des champs obligatoire
    if (!service || !email || !password || !masterPassword) {
      return res.status(400).json({
        message: "Tout les champs sont obligatoire",
      });
    }

    // Vérifie que le mdp maitre est ok
    const user = await findUserById(req.user.id);
    const valid = await argon2.verify(user.password_hash, masterPassword);
    if (!valid)
      return res
        .status(401)
        .json({ message: "Mot de passe principal incorrect" });

    // Dérive la clé a partir du mdp de connexion user

    const encryptionKey = deriveEncryptionKey(masterPassword);

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
    const { masterPassword } = req.body;

    if (!masterPassword) {
      return res.status(400).json({ message: "Mot de passe principal requis" });
    }

    const user = await findUserById(req.user.id);
    const valid = await argon2.verify(user.password_hash, masterPassword);
    if (!valid)
      return res
        .status(401)
        .json({ message: " Mot de passe principal requis" });
    // on récupère les données chiffrés depuis la base
    const credentials = await getCredentialsByUserId(req.user.id);

    const encryptionKey = deriveEncryptionKey(masterPassword);

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
      return res.status(404).json({ message: "Identifiant non trouvé  " });
    }

    res.json({ message: "Identifiant supprimé avec succès " });
  } catch (error) {
    console.error("Erreur deleteMyCredential :", error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression " });
  }
};
