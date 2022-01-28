const referrenceValidator = require("mongoose-referrence-validator")

const mongoose = require("mongoose")
const { Schema } = mongoose

const ScoreSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    quizId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Quiz",
    },
    score: Number,
  },
  {
    timestamps: true,
  }
)
ScoreSchema.plugin(referrenceValidator)
const Score = mongoose.model("Score", ScoreSchema)

module.exports = { Score }
