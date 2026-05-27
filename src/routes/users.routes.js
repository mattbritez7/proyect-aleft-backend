const router = require('express').Router();
const bcrypt = require("bcrypt");
const User = require("../models/users")
const passport = require('passport');



router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) return res.status(401).json({ msg: info.message });
    req.logIn(user, function(err) {
      if (err) return next(err);
      res.status(200).send(req.user);
    });
  })(req, res, next);
})

router.post("/register", async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user");
  }
});


router.get("/me", (req, res) => {
  if (!req.user) return res.status(401).send("Not authenticated");
  res.send(req.user.username);
});

router.get("/profile", (req, res) => {

  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

router.post("/logout", (req, res)=>{
  req.logout();
  res.status(200).send(req.body)
})
  
module.exports = router;