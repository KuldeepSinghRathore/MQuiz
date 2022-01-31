const catchAsyncHandler = require("../middlewares/catchAsyncHandler")
const { User } = require("../models/user.model")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/errorHandler")
const jwt = require("jsonwebtoken")
// Signup User

const signupUser = catchAsyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body
  const userFromDb = await User.findOne({ email })
  if (userFromDb) {
    return next(new ErrorHandler("User already exists", 400))
  }
  // bcrypt password
  // hashing password
  let pass = password.toString()
  bcrypt.hash(pass, 10, async (err, hash) => {
    if (err) {
      return next(new ErrorHandler("Cannot create user", 500))
    } else {
      const newUser = new User({
        name,
        email,
        password: hash,
      })
      // saving New user
      const saveNewUser = await newUser.save()
      //   node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
      // creating token
      const token = jwt.sign(
        { userId: saveNewUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      )
      res.json({
        success: true,
        message: "User Created Successfully",
        token,
        userId: saveNewUser._id,
        name: saveNewUser.name,
      })
    }
  })
})

// Login User
const loginUser = catchAsyncHandler(async (req, res, next) => {
  const userFromBody = req.body
  const { email, password } = userFromBody
  userFromBody.password = password.toString()
  if (!userFromBody.email || !userFromBody.password) {
    return next(new ErrorHandler("Please provide email and password", 400))
  }

  // finding user by email
  const userFromDb = await User.findOne({ email }).select("+password")
  if (userFromDb === null) {
    return next(new ErrorHandler("Invalid Email Or Password", 401))
  }
  // comparing password

  const isPasswordMatched = await bcrypt.compare(
    userFromBody.password,
    userFromDb.password
  )
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Password is incorrect", 401))
  }
  // creating token
  const token = jwt.sign({ userId: userFromDb._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })
  return res.status(200).json({
    success: true,
    message: "Login Successful",

    userId: userFromDb.id,
    name: userFromDb.name,
    email: userFromDb.email,
    token,
  })
})
module.exports = { signupUser, loginUser }
