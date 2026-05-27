const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Sale = require("../models/sale");

router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find();
    console.log(sales);
    res.json(sales);
  } catch (error) {
    console.log(error);
  }
});

router.get("/mis-ventas", async (req, res) => {
    try {
      const sales = await Sale.find({ user: req.user.username});
      console.log(sales);
      res.json(sales);
    } catch (error) {
      console.log(error);
    }
  });

router.post("/", async (req, res) => {
  try {
    const {
      Estado,
      Nombre,
      Producto,
      Precio,
      Dias,
      Dni,
      FechaDeNacimiento,
      DireccionDelComercio,
      EntreCalles,
      DireccionCasa,
      Localidad,
      Telefono1,
      Telefono2,
    } = req.body;
    const sale = new Sale({
      Estado,
      Nombre,
      Producto,
      Precio,
      Dias,
      Dni,
      FechaDeNacimiento,
      DireccionDelComercio,
      EntreCalles,
      DireccionCasa,
      Localidad,
      Telefono1,
      Telefono2,
    });
    sale.user = req.user.username;
    await sale.save();
    res.json({ status: "sale saved" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { Estado } = req.body;
    const newSale = { Estado };
    console.log(newSale);
    await Sale.findByIdAndUpdate(req.params.id, newSale);
    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ msg: `Invalid id: ${id}` });
    const sale = await Sale.findById(id);
    if (!sale) return res.status(404).json({ msg: "Sale not found" });
    res.json(sale);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id: id } = req.params;
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ msg: `No sale with id :${id}` });
    const sale = await Sale.findOneAndDelete({ _id: id });
    res.status(200).json(sale);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
