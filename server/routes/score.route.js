const {
  saveScore,
  getAllScores,
  getUserScore,
} = require("../controllers/score.controller")
const verifyAuth = require("../middlewares/verifyAuth")

const router = require("express").Router()

router.route("/score").get(getAllScores)
router.route("/score/save").post(verifyAuth, saveScore)
router.route("/user/score").get(verifyAuth, getUserScore)

module.exports = router
