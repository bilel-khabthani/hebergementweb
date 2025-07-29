import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  userId: String,
  username: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
