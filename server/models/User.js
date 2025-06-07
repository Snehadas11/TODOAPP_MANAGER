const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  oauthId: { type: String, required: true, unique: true }, // ID from Google/GitHub
  provider: { type: String, required: true }, // 'google' or 'github'
  displayName: { type: String },
  email: { type: String },
  photo: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
