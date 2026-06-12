const router = require('express').Router();
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
    const newUser = new User({
      Email: req.body.Email,
      Password: req.body.Password,
      username: req.body.username,
      role: req.body.role || 'cliente',
      Company: req.body.Company || ''
    });
    await newUser.save();
    res.send("Usuario creado");
    console.log(newUser)
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear usuario");
  }
});

router.get("/me", (req, res) => {
  if (!req.user) return res.status(401).send("No autenticado");
  res.send(req.user);
});

router.get("/profile", (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res)=>{
  req.logout();
  res.status(200).send(req.body)
})

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { Password: 0 });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener usuarios" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const update = {};
    if (req.body.Password) {
      if (req.body.Password.length < 6) {
        return res.status(400).json({ msg: "La contraseña debe tener al menos 6 caracteres" });
      }
      update.Password = req.body.Password;
    }
    if (req.body.role) update.role = req.body.role;
    if (req.body.Company !== undefined) update.Company = req.body.Company;
    const updated = await User.findByIdAndUpdate(req.params.id, update);
    if (!updated) return res.status(404).json({ msg: "Usuario no encontrado" });
    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al actualizar usuario" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al eliminar usuario" });
  }
});

module.exports = router;