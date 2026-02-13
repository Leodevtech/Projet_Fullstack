import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  addCredential,
  getMyCredentials,
  deleteMyCredentials,
} from "../controllers/credential.controller.js";

const router = express.Router();

// Middleware de protection: toute les route nécessitent un token jwt valide

router.use(authMiddleware);

// Routes pour la gestion des iddentifiants

// Ajout un nouvel idd
router.post("/home", addCredential);

// récuperer tous les idd
router.get("/home", getMyCredentials);

//supprimer un idd par son id
router.delete("/home/:id", deleteMyCredentials);

export default router;
