const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  dueDate: { type: Date },
  status: { type: String, enum: ['Open', 'Complete'], default: 'Open' },  // Added status field
  userId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
