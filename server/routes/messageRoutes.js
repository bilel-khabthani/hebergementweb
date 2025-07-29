import express from 'express';
import Message from '../models/Message.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Middleware pour extraire userId du token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Accès non autorisé' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide', error: error.message });
  }
};

// Enregistrer un message
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { content, sender } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Le contenu du message est requis' });
    }
    const message = new Message({ content, sender, userId: req.userId });
    await message.save();
    res.status(201).json({ message: 'Message enregistré', data: message });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Récupérer les messages de l'utilisateur connecté
router.get('/', authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.userId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

export default router;