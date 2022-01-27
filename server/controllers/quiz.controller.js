const catchAsyncHandler = require("../middlewares/catchAsyncHandler")
const { Quiz } = require("../models/quiz.model")
const ErrorHandler = require("../utils/errorHandler")

const getAllQuizzes = catchAsyncHandler(async (req, res) => {
  const quizzes = await Quiz.find()
  res.status(200).json({
    success: true,
    data: {
      quizzes,
    },
  })
})

const saveQuizToDb = (quizData) => {
  quizData.forEach(async (element) => {
    const quiz = new Quiz(element)
    await quiz.save()
  })
}
const addNewQuiz = catchAsyncHandler(async (req, res) => {
  const quiz = new Quiz(req.body)
  await quiz.save()
  res.status(200).json({
    success: true,
    data: {
      quiz,
    },
  })
})

const getSingleQuiz = catchAsyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id)
  if (!quiz) {
    return next(new ErrorHandler("No quiz found", 404))
  }
  res.status(200).json({
    success: true,
    data: {
      quiz,
    },
  })
})

module.exports = { getAllQuizzes, saveQuizToDb, addNewQuiz, getSingleQuiz }
