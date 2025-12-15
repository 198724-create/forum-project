const express = require('express');
const router = express.Router();

const Answer = require('../models/answer');

// ✅ POST /api/answers  (create an answer)
router.post('/', async (req, res) => {
  try {
    const { content, question } = req.body;

    if (!content || !question) {
      return res.status(400).json({ message: 'content and question are required' });
    }

    const newAnswer = await Answer.create({ content, question });
    res.status(201).json(newAnswer);
  } catch (err) {
    console.error('Error creating answer:', err);
    res.status(500).json({ message: 'Error creating answer' });
  }
});


// ✅ GET /api/answers?question=QUESTION_ID  (get answers for a question)
router.get('/', async (req, res) => {
  try {
    const { question } = req.query;

    if (!question) {
      return res.status(400).json({ message: 'question query param is required' });
    }

    const answers = await Answer.find({ question })
      .sort({ createdAt: -1 }); // newest first (you can flip to 1 if you want oldest first)

    res.json(answers);
  } catch (err) {
    console.error('Error fetching answers:', err);
    res.status(500).json({ message: 'Error fetching answers' });
  }
});

module.exports = router;
