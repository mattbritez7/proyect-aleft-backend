const express = require('express');
const router = express.Router();
const passport = require('passport');

const Users = require("../models/users")


router.get('/more', async (req, res) => {
    const users = await Users.find();
    console.log(users);
    res.json(users)
});

router.post("/singup", passport.authenticate("local-singup",{
    successRedirect: "/",
    failureRedirect: "localhost:3000/iniciar-sesion",
    passReqToCallback: true
}));


router.post("/create", async (req, res) => {
    const {Name, Password, IsAdmin} = req.body;
    const users = new Users({Name, Password, IsAdmin}) 
    await users.save();
    console.log(users)
    res.json({status: "user save"})
})

module.exports = router;