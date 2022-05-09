const router = require('express').Router();
const bcrypt = require("bcrypt");
const User = require("../models/users")
const passport = require('passport');



router.post('/login', 
  passport.authenticate('local'),
  function(req, res) {
    res.status(200).send(req.user)
    
  })

router.post("/register", (req, res) => {
  User.findOne({ Email: req.body.Email }, async (err, doc) => {
    console.log(req.body.Email)
    
      const hashedPassword = await bcrypt.hash(req.body.Password, 10);

      const newUser = new User({
        Email: req.body.Email,
        Password: hashedPassword,
        username: req.body.username,
        IsAdmin: req.body.IsAdmin
      });
      await newUser.save();
      res.send("User Created");
      console.log(newUser)
    
  });
});


router.get("/me", (req, res) => {

  res.send(req.user.username); // The req.user stores the entire user that has been authenticated inside of it.
});

router.get("/profile", (req, res) => {

  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

router.post("/logout", (req, res)=>{
  req.logout();
  res.status(200).send(req.body)
})
  
module.exports = router;