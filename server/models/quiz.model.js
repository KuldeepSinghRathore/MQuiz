const mongoose = require("mongoose")
const { Schema } = mongoose

const OptionSchema = new Schema({
  id: Schema.Types.ObjectId,
  text: {
    type: String,
    trim: true,
    required: [true, "Please enter an option"],
  },
  isRight: {
    type: Boolean,
    required: true,
  },
})
const QuestionSchema = new Schema({
  question: {
    type: String,
    trim: true,
    required: [true, "Question Text is required"],
  },
  points: {
    type: Number,
    required: true,
    default: 10,
  },
  options: [OptionSchema],
})

const QuizSchema = new Schema({
  id: Schema.Types.ObjectId,
  topic: {
    type: String,
    trim: true,
    required: [true, "please enter the quiz topic"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "please enter the quiz description"],
  },
  image: String,
  questions: [QuestionSchema],
})

const Quiz = mongoose.model("Quiz", QuizSchema)

module.exports = { Quiz }
