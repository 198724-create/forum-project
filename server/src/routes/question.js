const express = require('express');
const router = express.Router();

const Question = require('../models/question');
const Answer = require('../models/answer'); // make sure this exists + matches filename

// ✅ POST create a question
router.post('/', async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: 'title, content, and category are required.' });
    }

    const newQuestion = await Question.create({ title, content, category });

    // populate category on the response (nice for Thunder + frontend)
    const populated = await Question.findById(newQuestion._id).populate('category', 'name');

    res.status(201).json({
      message: 'Question created successfully.',
      question: populated,
    });
  } catch (err) {
    console.error('Error creating question:', err);
    res.status(500).json({ message: 'Error creating question.' });
  }
});

// ✅ GET list questions (optionally filter by category)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};
    if (category) filter.category = category;

    const questions = await Question.find(filter)
      .populate('category', 'name')     // only bring back category name (clean)
      .sort({ createdAt: -1 });         // newest first

    res.status(200).json(questions);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ message: 'Error fetching questions.' });
  }
});

// ✅ GET ONE question + ALL answers (this is the “nested” response)
// GET one question by id
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('category');

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(question);
  } catch (err) {
    console.error('Error fetching question:', err);
    res.status(500).json({ message: 'Error fetching question' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await Question.findById(questionId).populate('category', 'name');
    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    const answers = await Answer.find({ question: questionId }).sort({ createdAt: 1 }); // oldest first

    res.status(200).json({
      question,
      answers,
    });
  } catch (err) {
    console.error('Error fetching question details:', err);
    res.status(500).json({ message: 'Error fetching question details.' });
  }
});

module.exports = router;

