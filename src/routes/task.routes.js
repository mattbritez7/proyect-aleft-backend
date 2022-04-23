const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require("../models/task")

router.get('/', async (req, res) => {
    try {
    const tasks = await Task.find();
    console.log(tasks);
    res.json(tasks)}catch (error) {
        console.log(error);
       }
});

router.post("/", async (req, res) => {
    try{
    const {Nombre, Dni, FechaDeNacimiento, DireccionDelComercio, EntreCalles, DireccionCasa, Localidad, Telefono1, Telefono2} = req.body;
    const task = new Task({Nombre, Dni, FechaDeNacimiento, DireccionDelComercio, EntreCalles, DireccionCasa, Localidad, Telefono1, Telefono2}) 
    await task.save();
    res.json({status: "task save"})}
    catch (error) {
        console.log(error);
    }
})

router.put("/:id", async (req, res) => {
    try {
    const {Nombre, Dni, FechaDeNacimiento, DireccionDelComercio, EntreCalles, DireccionCasa, Localidad, Telefono1, Telefono2} = req.body;
    const newTask = {Nombre, Dni, FechaDeNacimiento, DireccionDelComercio, EntreCalles, DireccionCasa, Localidad, Telefono1, Telefono2};
    Task.findByIdAndUpdate(req.params.id, newTask)
    res.json({status: "success"})}
    catch (error) { console.log(error)}
})

router.get('/:id', async (req, res) => {
    try{
    const { id: id } = req.params;
    const task = await Task.findById(req.params.id)
    if (!mongoose.Types.ObjectId.isValid({ _id: id })) 
    return res.status(200).json({ msg: `id :${id}`});}
    catch (error) {
        console.log(error);
       }
    
})

router.delete("/:id", async (req, res) => {
    try {
        const { id: id } = req.params;
        console.log(id);
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(404).json({ msg: `No task with id :${id}` 
        });
        const task = await Task.findOneAndDelete({ _id: id });
        res.status(200).json(task);
       } catch (error) {
        console.log(error);
       }
})
module.exports = router;