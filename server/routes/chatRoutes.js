import express from "express";
import { qaPairs } from "../qaData.js";

const router = express.Router();

// Route pour répondre aux messages
router.post("/", (req, res) => {
  const userMsg = req.body.message?.toLowerCase() || "";

  // Chercher une réponse exacte dans les QA
  const match = qaPairs.find(
    (pair) => userMsg.includes(pair.question.toLowerCase())
  );

  if (match) {
    return res.json({ reply: match.answer });
  } else {
    // Si rien trouvé, renvoie une réponse par défaut
    return res.json({
      reply: "🤖 Désolé, je n'ai pas compris. Pouvez-vous reformuler ?",
    });
  }
});

// ✅ Nouvelle route pour récupérer la liste des questions
router.get("/questions", (req, res) => {
  const questions = qaPairs.map((pair) => pair.question);
  res.json(questions);
});

export default router;