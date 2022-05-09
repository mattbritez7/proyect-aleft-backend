const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const  { Schema } = mongoose;

const UserSchema = new Schema ({ 
    username: { type: String, required: false},
    Email: {type: String, required: false},
    Password: {type:String, required: false},
    IsAdmin: {type: Boolean, default: false}
});

module.exports = mongoose.model("Users", UserSchema);