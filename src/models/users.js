const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const UserSchema = new Schema({ 
    username: { type: String, required: false},
    Email: {type: String, required: false},
    Password: {type:String, required: false},
    role: { type: String, enum: ['administrador', 'vendedor', 'cliente'], default: 'cliente' },
    Company: { type: String, default: '' }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('Password')) return next();
  if (!this.Password) return next();
  try {
    this.Password = await bcrypt.hash(this.Password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  if (!update.Password && !update.$set?.Password) return next();
  const plainPassword = update.Password || update.$set?.Password;
  if (!plainPassword) return next();
  try {
    const hash = await bcrypt.hash(plainPassword, 10);
    if (update.Password) update.Password = hash;
    if (update.$set?.Password) update.$set.Password = hash;
    this.setUpdate(update);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Users", UserSchema);