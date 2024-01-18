const staticFileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
  });
  
  const StaticFile = mongoose.model('StaticFile', staticFileSchema);
  
  module.exports = StaticFile;
  