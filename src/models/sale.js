const mongoose = require('mongoose');

const  { Schema } = mongoose;

const SaleSchema = new Schema ({ 
    Estado: { type: Number, default: 1, required: false},
    Nombre: { type: String, required: false},
    Producto: { type: String, required: false},
    Precio: { type: String, required: false},
    ValorCuota: { type: String, required: false},
    Dias: { type: String, required: false},
    Modalidad: { type: String, enum: ['diario', 'semanal', 'mensual'], required: false},
    Dni: { type: String, required: false},
    FechaDeNacimiento: { type: String, required: false},
    DireccionDelComercio: { type: String, required: false},
    EntreCalles: { type: String, required: false},
    DireccionCasa: { type: String, required: false},
    Localidad: { type: String, required: false},
    Telefono1: { type: String, required: false},
    Telefono2: { type: String, required: false},
    Company: { type: String, default: "", required: false},
    user: { type: String, required: false}
});

module.exports = mongoose.model("Sale", SaleSchema);