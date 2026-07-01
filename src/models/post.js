const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  image: { type: String, default: '' },
  text: { type: String, default: '' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
