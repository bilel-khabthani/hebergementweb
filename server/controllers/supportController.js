// controllers/supportController.js
import SupportTicket from '../models/SupportTicket';

export const createSupportTicket = async (req, res) => {
  try {
    const { userId, message, userEmail } = req.body;
    
    const ticket = new SupportTicket({
      user: userId,
      message,
      status: 'open',
      userEmail
    });

    await ticket.save();

    // Envoyer une notification aux développeurs (email/slack/etc.)
    sendNotificationToDevs(ticket);

    res.status(201).json({ 
      success: true, 
      message: 'Ticket créé avec succès' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const sendNotificationToDevs = (ticket) => {
  // Implémentez l'envoi de notification (email, Slack, etc.)
  console.log(`Nouveau ticket de support: ${ticket._id}`);
};