const express = require('express');
const router = express.Router();
const SchemaModel = require('../models/schemaModel');
const isAuth = require('../middlewares/isAuth');

// GET /schemas → retrieve all (only title, description, _id)
router.get('/', isAuth, async (req, res) => {
    try {
        const schemas = await SchemaModel.find({ user: req.user.id })
            .select('title description') // this automatically includes _id
            .sort({ createdAt: -1 });

        res.json(schemas);
    } catch (err) {
        console.error('Error fetching schemas:', err);
        res.status(500).json({ error: 'Failed to fetch schemas' });
    }
});

// GET /schemas/:id → retrieve one by ID
router.get('/key/:key', async (req, res) => {
    const { key } = req.params;
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate a delay of 1.2 seconds
    try {
        const schema = await SchemaModel.findOne({ key: key });
        if (!schema) {
            return res.status(404).json({ error: 'Schema not found' });
        }
        res.json(schema);
    } catch (err) {
        console.error(`Error fetching schema with key ${key}:`, err);
        res.status(500).json({ error: 'Failed to fetch schema' });
    }
});

// GET /schemas/:id → retrieve one by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate a delay of 1.2 seconds
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
router.post('/', isAuth, async (req, res) => {
    const { data, title, description, key } = req.body;

    if (!data || !title) {
        return res.status(400).json({ error: 'Title and data are required' });
    }

    try {
        const newSchema = new SchemaModel({
            user: req.user.id,
            key,
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

// PATCH /schemas/:id → partially update a schema
router.put('/:id', isAuth, async (req, res) => {
    const { id } = req.params;

    try {
        const schema = await SchemaModel.findById(id);
        if (!schema) {
            return res.status(404).json({ error: 'Schema not found' });
        }
        if (schema.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to update this schema' });
        }

        // Define fields allowed to be updated
        const allowedFields = ['title', 'description', 'data'];

        // Dynamically update only allowed fields
        Object.keys(req.body).forEach((key) => {
            if (req.body[key] !== undefined && allowedFields.includes(key)) {
                schema[key] = req.body[key];
            }
        });

        const updatedSchema = await schema.save();
        res.json(updatedSchema);
    } catch (err) {
        console.error(`Error updating schema with id ${id}:`, err);
        res.status(500).json({ error: 'Failed to update schema' });
    }
});


// DELETE /schemas/:id → delete one by ID
router.delete('/:id', isAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const schema = await SchemaModel.findById(id);
        if (!schema) {
            return res.status(404).json({ error: 'Schema not found' });
        }
        if (schema.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to delete this schema' });
        }
        await SchemaModel.findByIdAndDelete(id);
        res.json({ message: 'Schema deleted successfully' });
    } catch (err) {
        console.error(`Error deleting schema with id ${id}:`, err);
        res.status(500).json({ error: 'Failed to delete schema' });
    }
});

module.exports = router;
