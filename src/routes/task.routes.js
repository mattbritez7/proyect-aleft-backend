const express = require('express');
const router = express.Router();

const Task = require("../models/task")

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    console.log(tasks);
    res.json(tasks)
});

router.post("/", async (req, res) => {
    const {Nombre, Dni, FechaDeNacimiento, DireccionDelComercio, EntreCalles, DireccionCasa, Localidad, Telefono1, Telefono2} = req.body;
    const task = new Task({Nombre, Dni, FechaDeNacimiento, DireccionDelComercio, EntreCalles, DireccionCasa, Localidad, Telefono1, Telefono2}) 
    await task.save();
    res.json({status: "task save"})
})

router.put("/:id", async (req, res) => {
    const {Nombre, Dni, FechaDeNacimiento, DireccionDelComercio, EntreCalles, DireccionCasa, Localidad, Telefono1, Telefono2} = req.body;
    const newTask = {Nombre, Dni, FechaDeNacimiento, DireccionDelComercio, EntreCalles, DireccionCasa, Localidad, Telefono1, Telefono2};
    Task.findByIdAndUpdate(req.params.id, newTask)
    res.json({status: "success"})
})

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id)
    res.json(task)
})

router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.json({status: "task delete"})
})
module.exports = router;