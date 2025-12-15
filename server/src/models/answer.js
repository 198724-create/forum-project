const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Answer', answerSchema);
