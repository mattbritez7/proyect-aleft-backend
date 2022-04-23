const mongoose = require('mongoose');
const bCrypt = require('bcrypt-nodejs');

const  { Schema } = mongoose;

const UserSchema = new Schema ({ 
    Name: { type: String, required: false},
    Email: {type: String, required: false},
    Password: {type:String, required: false},
    IsAdmin: {type: Boolean, default: false}
});

UserSchema.methods.encryptPassword = (Password) => {
    return bCrypt.hashSync(Password, bCrypt.genSaltSync(10))
};

UserSchema.methods.comparePassword = function (Password) {
    return bCrypt.compareSync(Password, this.Password);
}

module.exports = mongoose.model("Users", UserSchema);