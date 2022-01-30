import { useStateContext } from "context/StateProvider"
import React from "react"
import { Questions } from "types/types"
import { useNavigate } from "react-router-dom"
export const ReviewPage = () => {
  const { state } = useStateContext()
  const navigate = useNavigate()
  const calculateScore = (questionArr: Questions[]) => {
    const score = questionArr?.reduce((acc, cur) => {
      if (!cur.selectedOption) return acc
      const rightAnswerId =
        cur?.options[cur?.options.findIndex((x) => x.isRight)]._id
      if (cur?.selectedOption === rightAnswerId) {
        return acc + cur.points
      } else if (cur?.selectedOption !== rightAnswerId) {
        return acc - 2
      }
      return acc
    }, 0)
    return score
  }
  return (
    <div className="w-full p-4">
      <div className="bg-black py-3 text-center text-yellow-300 font-bold flex items-center justify-center gap-8 ">
        <div className="flex flex-col md:flex-row">
          <span>Category: </span>
          <span className="bg-white text-black px-3 rounded-full mt-1 ml-5">
            {state.currentCategory?.topic}
          </span>
        </div>
        <div className="flex flex-col md:flex-row">
          <p>Your Score: </p>
          <span className="bg-white text-black px-3 rounded-full ml-5">
            {calculateScore(state?.currentCategory?.questions)}
          </span>
        </div>
      </div>
      {state.currentCategory?.questions.map((question) => {
        return (
          <div key={question._id}>
            <p className="py-5 px-2 mt-3 font-medium text-center bg-yellow-300">
              {question.question}
            </p>
            <div className="flex flex-col  justify-evenly items-center  md:flex-row  mt-10 ">
              {question.options.map((option) => (
                <button
                  className={`py-3 font-semibold px-5 mb-3 mr-1 rounded-full bg-yellow-50 w-full md:w-max  ${
                    (option.isRight && "bg-green-400 text-green-900") ||
                    (option._id === question.selectedOption &&
                      "bg-red-700 text-red-100")
                  }`}
                  key={option._id}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )
      })}
      <button
        onClick={() => navigate("/")}
        className="bg-yellow-300 px-5 py-2 rounded font-extrabold mt-4 flex justify-center mx-auto"
      >
        Play Again
      </button>
    </div>
  )
}
