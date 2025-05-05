const express = require('express');
const router = express.Router();
const SchemaModel = require('../models/schemaModel');

// GET /schemas → retrieve all (only title, description, _id)
router.get('/', async (req, res) => {
    try {
        const schemas = await SchemaModel.find()
            .select('title description') // this automatically includes _id
            .sort({ createdAt: -1 });

        res.json(schemas);
    } catch (err) {
        console.error('Error fetching schemas:', err);
        res.status(500).json({ error: 'Failed to fetch schemas' });
    }
});


// GET /schemas/:id → retrieve one by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const schema = await SchemaModel.findById(id);
        if (!schema) {
            return res.status(404).json({ error: 'Schema not found' });
        }
        res.json(schema);
    } catch (err) {
        console.error(`Error fetching schema with id ${id}:`, err);
        res.status(500).json({ error: 'Failed to fetch schema' });
    }
});

// POST /schemas → save one
router.post('/', async (req, res) => {
    const { data, title, description } = req.body;

    if (!data || !title) {
        return res.status(400).json({ error: 'Title and data are required' });
    }

    try {
        const newSchema = new SchemaModel({
            title,
            description,
            data
        });
        const savedSchema = await newSchema.save();
        res.status(201).json(savedSchema);
    } catch (err) {
        console.error('Error saving schema:', err);
        res.status(500).json({ error: 'Failed to save schema' });
    }
});

// DELETE /schemas/:id → delete one by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await SchemaModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Schema not found' });
        }
        res.json({ message: 'Schema deleted successfully' });
    } catch (err) {
        console.error(`Error deleting schema with id ${id}:`, err);
        res.status(500).json({ error: 'Failed to delete schema' });
    }
});

module.exports = router;
