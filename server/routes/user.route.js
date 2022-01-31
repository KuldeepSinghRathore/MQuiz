const { signupUser, loginUser } = require("../controllers/user.controller")

const router = require("express").Router()

router.route("/signup").post(signupUser)
router.route("/login").post(loginUser)
module.exports = router
