const catchAsyncHandler = require("../middlewares/catchAsyncHandler")
const { Score } = require("../models/score.model")
const ErrorHandler = require("../utils/errorHandler")

const saveScore = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req
  const { quizId, name, score } = req.body

  const userWithScore = await Score.findOne({ userId, quizId })
  console.log(userWithScore, "userWithScore")
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

  const updatedScore = Object.assign(userWithScore, {
    userId,
    quizId,
    name,
    score,
  })
  await updatedScore.save()
  res.status(200).json({
    success: true,
    message: "Score Updated Successfully",
  })
})

const getAllScores = catchAsyncHandler(async (req, res, next) => {
  const scores = await Score.find().populate("quizId", "topic")

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
