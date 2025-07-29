import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true }, 
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
   status: { 
    type: String, 
    required: true,
    enum: ["unread", "read", "pending", "resolved", "archived"], // Status types from frontend
    default: "unread" 
  },
});

const contactModel = mongoose.models.contact || mongoose.model("contact", contactSchema);
export default contactModel;