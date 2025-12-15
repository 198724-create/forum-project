const express = require('express');
const Category = require('../models/category');

const router = express.Router();

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Error fetching categories.' });
  }
});

// POST /api/categories
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) return res.status(400).json({ message: 'Name is required.' });

    const existing = await Category.findOne({ name });
    if (existing)
      return res.status(409).json({ message: 'Category already exists.' });

    const category = await Category.create({
      name,
      description: description || ''
    });

    res.status(201).json({
      message: 'Category created successfully.',
      category
    });
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ message: 'Error creating category.' });
  }
});

module.exports = router;

