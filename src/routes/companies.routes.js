const express = require('express');
const router = express.Router();
const Company = require('../models/company');

router.get('/', async (req, res) => {
    try {
        const companies = await Company.find().sort({ name: 1 });
        res.json(companies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const existing = await Company.findOne({ name: req.body.name });
        if (existing) {
            return res.status(400).json({ message: 'La empresa ya existe' });
        }
        const company = new Company({ name: req.body.name });
        await company.save();
        res.status(201).json(company);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Company.findByIdAndDelete(req.params.id);
        res.json({ message: 'Empresa eliminada' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;