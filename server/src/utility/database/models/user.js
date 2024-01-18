const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  uploadedFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StaticFile' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
