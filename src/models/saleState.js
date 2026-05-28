const mongoose = require('mongoose');

const { Schema } = mongoose;

const SaleStateSchema = new Schema({
  code: { type: Number, required: true, unique: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model("SaleState", SaleStateSchema);
