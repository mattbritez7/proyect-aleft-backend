const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Sale = require("../models/sale");

router.get("/", async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ msg: "No autenticado" });
    let sales;
    if (req.user.role === 'administrador') {
      sales = await Sale.find();
    } else if (req.user.role === 'cliente') {
      sales = await Sale.find({ Company: req.user.Company });
    } else {
      sales = await Sale.find({ user: req.user.username });
    }
    console.log(sales);
    res.json(sales);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
});

router.get("/mis-ventas", async (req, res) => {
    try {
      if (!req.user) return res.status(401).json({ msg: "No autenticado" });
      const sales = await Sale.find({ user: req.user.username});
      console.log(sales);
      res.json(sales);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error.message || "Error del servidor" });
    }
  });

router.post("/", async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ msg: "No autenticado" });

    const {
      Estado, Nombre, Producto, Precio, ValorCuota, Dias, Modalidad,
      Dni, FechaDeNacimiento, DireccionDelComercio, EntreCalles,
      DireccionCasa, Localidad, TipoComercio, Telefono1, Telefono2,
    } = req.body;

    // Build sale data excluding empty fields to avoid Mongoose cast errors
    const saleData = {
      Estado: 1, // Default: Pendiente
    };
    if (Estado && !isNaN(Number(Estado))) saleData.Estado = Number(Estado);
    if (Nombre) saleData.Nombre = Nombre;
    if (Producto) saleData.Producto = Producto;
    if (Precio) saleData.Precio = Precio;
    if (ValorCuota) saleData.ValorCuota = ValorCuota;
    if (Dias) saleData.Dias = Dias;
    if (Modalidad) saleData.Modalidad = Modalidad;
    if (Dni) saleData.Dni = Dni;
    if (FechaDeNacimiento) saleData.FechaDeNacimiento = FechaDeNacimiento;
    if (DireccionDelComercio) saleData.DireccionDelComercio = DireccionDelComercio;
    if (EntreCalles) saleData.EntreCalles = EntreCalles;
    if (DireccionCasa) saleData.DireccionCasa = DireccionCasa;
    if (TipoComercio) saleData.TipoComercio = TipoComercio;
    if (Localidad) saleData.Localidad = Localidad;
    if (Telefono1) saleData.Telefono1 = Telefono1;
    if (Telefono2) saleData.Telefono2 = Telefono2;

    const sale = new Sale(saleData);
    sale.user = req.user.username;
    await sale.save();
    res.json({ status: "sale saved" });
  } catch (error) {
    console.log(error);
    let msg = "Error al crear la venta";
    if (error.name === 'ValidationError') {
      const campos = Object.keys(error.errors).join(', ');
      msg = `Datos inválidos en: ${campos}. Revisa los campos del formulario.`;
    } else if (error.name === 'CastError') {
      msg = `El campo '${error.path}' tiene un valor incorrecto`;
    } else if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      msg = "Error en la base de datos al crear la venta";
    }
    res.status(500).json({ msg });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ msg: "No autenticado" });
    const { Estado, Company } = req.body;
    console.log("PUT /sales/:id body:", req.body, "user:", req.user.username, "role:", req.user.role);
    const newSale = {};
    if (Estado !== undefined && Estado !== null && Estado !== '') newSale.Estado = Number(Estado);
    if (Company !== undefined && req.user.role === 'administrador') newSale.Company = Company;
    console.log("Updating with:", newSale);
    await Sale.findByIdAndUpdate(req.params.id, newSale);
    res.json({ status: "success" });
  } catch (error) {
    console.log("Error en PUT /sales/:id", error);
    res.status(500).json({ msg: "Error del servidor" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ msg: `ID inválido: ${id}` });
    const sale = await Sale.findById(id);
    if (!sale) return res.status(404).json({ msg: "Venta no encontrada" });
    res.json(sale);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id: id } = req.params;
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ msg: `No hay venta con ID: ${id}` });
    const sale = await Sale.findOneAndDelete({ _id: id });
    res.status(200).json(sale);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message || "Error del servidor" });
  }
});
module.exports = router;
