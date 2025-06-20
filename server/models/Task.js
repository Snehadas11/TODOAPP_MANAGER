const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  status: { type: String, enum: ['Open', 'Complete'], default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
