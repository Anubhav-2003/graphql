const mongoose = require('mongoose');

const staticFileSchema = new mongoose.Schema({
    fileId: { type: String, required: true },
    mimeType: { type: String, required: true },
  });
  
  const StaticFile = mongoose.model('StaticFile', staticFileSchema);
  
  module.exports = StaticFile;
  