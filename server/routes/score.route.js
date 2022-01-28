const {
  saveScore,
  getAllScores,
  getUserScore,
} = require("../controllers/score.controller")

const router = require("express").Router()

router.route("/score").post(saveScore).get(getAllScores)
router.route("/user/score").get(getUserScore)

module.exports = router
