import mongoose from 'mongoose';

const supportTicketSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'anonymous',
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  userEmail: {
    type: String,
    default: 'anonymous@habile-solutions.com',
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

supportTicketSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('SupportTicket', supportTicketSchema);