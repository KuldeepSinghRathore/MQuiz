const catchAsyncHandler = require("../middlewares/catchAsyncHandler")
const { Score } = require("../models/score.model")
const ErrorHandler = require("../utils/errorHandler")

const saveScore = catchAsyncHandler(async (req, res, next) => {
  const { userId, quizId, name, score } = req.body

  const userWithScore = await Score.findOne({ userId, quizId })
  if (!userWithScore) {
    const newScore = new Score({
      userId,
      quizId,
      name,
      score,
    })
    await newScore.save()
    return res.status(200).json({
      success: true,
      message: "Score saved successfully",
    })
  }

  userWithScore.score = score
  await userWithScore.save()
  res.status(200).json({
    success: true,
    message: "Score Updated Successfully",
  })
})

const getAllScores = catchAsyncHandler(async (req, res, next) => {
  const scores = await Score.find()

  if (scores.length === 0) {
    return next(new ErrorHandler("No scores found play some quiz", 404))
  }

  res.status(200).json({
    success: true,
    scores,
  })
})
const getUserScore = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req
  const scores = await Score.find({ userId })

  if (scores.length === 0) {
    return next(new ErrorHandler("No scores found play some quiz", 404))
  }

  res.status(200).json({
    success: true,
    scores,
  })
})

module.exports = { saveScore, getAllScores, getUserScore }
