const express = require('express');
const router = express.Router();

const Users = require("../models/users")


router.get('/more', async (req, res) => {
    const users = await Users.find();
    console.log(users);
    res.json(users)
});




router.post("/create", async (req, res) => {
    const {Name, Password, ItsAdmin} = req.body;
    const users = new Users({Name, Password, ItsAdmin}) 
    await users.save();
    console.log(users)
    res.json({status: "user save"})
})

module.exports = router;