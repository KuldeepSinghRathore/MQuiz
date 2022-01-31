const {
  getAllQuizzes,
  addNewQuiz,
  getSingleQuiz,
} = require("../controllers/quiz.controller")

const router = require("express").Router()

router.route("/quizzes").get(getAllQuizzes)
router.route("/quizzes/new").post(addNewQuiz)
router.route("/quizzes/:id").get(getSingleQuiz)

module.exports = router
