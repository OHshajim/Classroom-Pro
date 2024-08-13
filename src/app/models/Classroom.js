import mongoose from 'mongoose';

const ClassroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  days: { type: [String], required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.models.Classroom || mongoose.model('Classroom', ClassroomSchema);

