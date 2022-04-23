const mongoose = require('mongoose');

const  { Schema } = mongoose;

const TaskSchema = new Schema ({ 
    Nombre: { type: String, required: true},
    Dni: { type: Number, required: true},
    FechaDeNacimiento: { type: String, required: true},
    DireccionDelComercio: { type: String, required: true},
    EntreCalles: { type: String, required: true},
    DireccionCasa: { type: String, required: true},
    Localidad: { type: String, required: true},
    Telefono1: { type: Number, required: true},
    Telefono2: { type: Number, required: true}
});

module.exports = mongoose.model("Task", TaskSchema);