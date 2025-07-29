import express from "express";
import SupportTicket from "../models/SupportTicket.js";
import sanitizeHtml from "sanitize-html";
import sendSupportEmail from "../config/email.js";
import userAuth from "../middleware/userAuth.js";
import requireAdmin from "../middleware/requireAdmin.js";
import fs from "fs/promises";
import path from "path";

const router = express.Router();

// POST /api/support - Create a new support ticket (auth required)
router.post("/", userAuth, async (req, res) => {
  try {
    const { message, userEmail } = req.body;

    const sanitizedMessage = sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} });
    const sanitizedEmail = sanitizeHtml(userEmail, { allowedTags: [], allowedAttributes: {} });

    if (!sanitizedMessage) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const ticket = new SupportTicket({
      userId: req.userId || "anonymous",
      message: sanitizedMessage,
      userEmail: sanitizedEmail || req.user?.email || "anonymous@habile-solutions.com",
      status: "open",
      createdAt: new Date(),
    });

    await ticket.save();

    await fs.appendFile(
      path.join(process.cwd(), "logs/support.log"),
      `New support ticket created: ${ticket._id} by user ${ticket.userId} at ${new Date().toISOString()}\n`
    );

    await sendSupportEmail({
      userEmail: sanitizedEmail,
      message: sanitizedMessage,
      ticketId: ticket._id,
    });

    return res.status(201).json({
      success: true,
      message: "Support ticket created successfully",
      ticketId: ticket._id,
    });
  } catch (error) {
    console.error("Error creating support ticket:", error);
    await fs.appendFile(
      path.join(process.cwd(), "logs/support.log"),
      `Error creating support ticket: ${error.message} at ${new Date().toISOString()}\n`
    );
    return res.status(500).json({ success: false, message: "Failed to create support ticket" });
  }
});

// GET /api/support/:userId - Get tickets for user (auth + ownership or admin)
router.get("/:userId", userAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    if (req.userId !== userId && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    const tickets = await SupportTicket.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, tickets });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch tickets" });
  }
});

// GET /api/support/admin/tickets - Get all tickets (admin only)
router.get("/admin/tickets", userAuth, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const tickets = await SupportTicket.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await SupportTicket.countDocuments();

    return res.status(200).json({ success: true, tickets, total });
  } catch (error) {
    console.error("Error fetching all tickets:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch all tickets" });
  }
});
// POST /api/support/:ticketId/reply - Admin reply to a ticket
router.post("/:ticketId/reply", userAuth, requireAdmin, async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { reply } = req.body;

    if (!reply || reply.trim() === "") {
      return res.status(400).json({ success: false, message: "Reply cannot be empty." });
    }

    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found." });
    }

    // Ajouter la réponse
    ticket.replies = ticket.replies || [];
    ticket.replies.push({
      sender: "admin",
      content: reply,
      createdAt: new Date(),
    });

    // Mettre à jour le statut (exemple: "in-progress" ou "closed")
    ticket.status = "in-progress";

    await ticket.save();

    // Envoyer un mail de réponse à l'utilisateur
    await sendSupportEmail({
      userEmail: ticket.userEmail,
      message: ticket.message,
      ticketId: ticket._id,
      reply,
      status: ticket.status,
    });

    return res.status(200).json({ success: true, ticket });
  } catch (error) {
    console.error("Error replying to ticket:", error);
    return res.status(500).json({ success: false, message: "Failed to send reply." });
  }
});
// PATCH /api/support/:ticketId/close - Close a ticket (admin only)
router.patch("/:ticketId/close", userAuth, requireAdmin, async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found." });
    }

    ticket.status = "closed";
    await ticket.save();

    return res.status(200).json({ success: true, message: "Ticket closed successfully", ticket });
  } catch (error) {
    console.error("Error closing ticket:", error);
    return res.status(500).json({ success: false, message: "Failed to close ticket." });
  }
});


export default router;
