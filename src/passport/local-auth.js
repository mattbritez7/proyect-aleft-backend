const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users')


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user)
});

passport.use("local-singup", new LocalStrategy({
    usernameField: "name",
    emailField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = new User();
    user.email = email;
    user.password = password;
    await user.save()
    done(null, user);
}));
