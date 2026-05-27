const mongoose = require('mongoose');

const  { Schema } = mongoose;

const SaleSchema = new Schema ({ 
    status: { type: Number, default: 1, required: false},
    name: { type: String, required: false},
    product: { type: String, required: false},
    price: { type: String, required: false},
    days: { type: String, required: false},
    dni: { type: String, required: false},
    dateOfBirth: { type: String, required: false},
    businessAddress: { type: String, required: false},
    betweenStreets: { type: String, required: false},
    homeAddress: { type: String, required: false},
    locality: { type: String, required: false},
    phone1: { type: String, required: false},
    phone2: { type: String, required: false},
    user: { type: String, required: false}
});

module.exports = mongoose.model("Sale", SaleSchema);