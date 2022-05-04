const router = require('express').Router();
const bcrypt = require("bcrypt");
const User = require("../models/users")
const passport = require('passport');


router.post('/login', 
  passport.authenticate('local'),
  function(req, res) {
    const frontendUrl = process.env.FRONTEND_URL || '/';

    res.redirect(frontendUrl);
  });


router.post("/register", (req, res) => {
  User.findOne({ Email: req.body.Email }, async (err, doc) => {
    console.log(req.body.Email)
    
      const hashedPassword = await bcrypt.hash(req.body.Password, 10);

      const newUser = new User({
        Email: req.body.Email,
        Password: hashedPassword,
        username: req.body.username
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