const mongoose = require('mongoose');

const  { Schema } = mongoose;

const UserSchema = new Schema ({ 
    Name: { type: String, required: false},
    Email: {type: String, required: false, unique: true},
    Password: {type:String, required: false},
    IsAdmin: {type: Boolean, default: false},
    quote: {type: String}
});


module.exports = mongoose.model("Users", UserSchema);