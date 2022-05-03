const bcrypt = require("bcrypt");
const LocalStrategy = require('passport-local').Strategy;

const User = require("../models/users")

function passport() {
  passport.use(
    new LocalStrategy( (Email, Password, done) => {
      User.findOne({ Email: Email}, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(Password, user.Password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        Email: user.Email,
      };
      cb(err, userInformation);
    });
  });
};


module.exports = passport