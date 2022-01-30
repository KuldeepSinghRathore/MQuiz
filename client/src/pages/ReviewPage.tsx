import { useStateContext } from "context/StateProvider"
import axios, { AxiosError } from "axios"
import React from "react"
import { Questions, ServerErrorMessage } from "types/types"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "context/AuthProvider"
import { API } from "API"
export const ReviewPage = () => {
  const { state, score, dispatch } = useStateContext()
  const { userName, token, userId } = useAuthContext()
  const navigate = useNavigate()

  const saveScoreToServer = async (url: string, token: any) => {
    try {
      if (token) {
        const { status } = await axios.post(
          url,
          {
            score,
            quizId: state.currentCategory._id,
            name: userName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (status === 200) {
          dispatch({
            type: "UPDATE_SCORE",
            payload: {
              userId: state.currentCategory._id,

              quizId: {
                _id: state.currentCategory._id,
                topic: state.currentCategory.topic,
              },
              score,
              name: userName,
            },
          })
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerErrorMessage>
        console.log({ serverError })
      }
    }
  }

  return (
    <div className="w-full p-4 mt-20">
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
            {score}
          </span>
        </div>
        <div className="flex flex-col md:flex-row ">
          <button
            onClick={() => {
              saveScoreToServer(`${API}/score/save`, token)
            }}
            className="bg-yellow-300 text-black font-bold px-4 rounded py-2"
          >
            Save Score
          </button>
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
