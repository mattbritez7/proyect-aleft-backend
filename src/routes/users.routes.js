const router = require('express').Router();
const bcrypt = require("bcrypt");
const User = require("../models/users")
const passport = require('passport');


router.post("/login", (req, res, next) => {
  
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});


router.post("/register", (req, res) => {

  User.findOne({ Email: req.body.Email }, async (err, doc) => {
    console.log(req.body.Email)
    
      const hashedPassword = await bcrypt.hash(req.body.Password, 10);

      const newUser = new User({
        Email: req.body.Email,
        Password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
      console.log(newUser)
    
  });
});

router.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

module.exports = router;