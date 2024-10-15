
import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  sessionToken: { type: String, required: true },
  userId: { type: String, required: true },
  expires: { type: Date, required: true },
});

export default mongoose.models.Session || mongoose.model('Session', SessionSchema);