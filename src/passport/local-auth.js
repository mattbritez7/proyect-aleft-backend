const bcrypt = require("bcrypt");
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')

const User = require("../models/users")

passport.use(
    new LocalStrategy({usernameField: 'username'}, async (username, Password, done) => {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' })
      }

      const isPasswordCorrect = await bcrypt.compare(Password, user.Password);

      if (!isPasswordCorrect)
        return done(null, false, { message: 'Contraseña incorrecta' });

      return done(null, user);
    })
  );

  // In serialize user you decide what to store in the session. Here I'm storing the user id only.
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  // Here you retrieve all the info of the user from the session storage using the user id stored in the session earlier using serialize user.
  passport.deserializeUser(async function(id, done) {
    const user = await User.findById(id);
    
    done(null, user);
  });