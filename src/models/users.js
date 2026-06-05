const mongoose = require('mongoose');

const  { Schema } = mongoose;

const UserSchema = new Schema ({ 
    username: { type: String, required: false},
    Email: {type: String, required: false},
    Password: {type:String, required: false},
    role: { type: String, enum: ['admin', 'vendedor', 'cliente'], default: 'cliente' },
    Company: { type: String, default: '' }
});

module.exports = mongoose.model("Users", UserSchema);