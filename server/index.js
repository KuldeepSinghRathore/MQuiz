const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
//import routes
const quizRouter = require("./routes/quiz.route")
const userRouter = require("./routes/user.route")
const scoreRouter = require("./routes/score.route")
const { connectDb } = require("./database/connectDb")
const { saveQuizToDb } = require("./controllers/quiz.controller")
const { data } = require("./database/data")
const errorMiddleware = require("./middlewares/error")
const verifyAuth = require("./middlewares/verifyAuth")

// handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.stack}`)
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down Server...")
  process.exit(1)
})

dotenv.config()
app.use(morgan("common"))
app.use(express.json())

app.use(cors())
// connecting to the database
connectDb()
// inserting data to the database
// saveQuizToDb(data)

// routes
app.use("/api/v1", quizRouter)
app.use("/api/v1", userRouter)
app.use("/api/v1", verifyAuth, scoreRouter)
// error handling middleware
app.use(errorMiddleware)

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  )
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down server due to unhandled promise rejection`)
  // Close server & exit process
  server.close(() => process.exit(1))
})
