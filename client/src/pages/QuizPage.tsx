import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Questions } from "types/types"
import { QuizCard } from "../components/QuizCard"
import { useStateContext } from "../context/StateProvider"

export const QuizPage = () => {
  const { state, setScore } = useStateContext()
  const [timeCounter, setTimeCounter] = useState(60)
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()
  const calculateScore = (questionArr: Questions[]) => {
    const score = questionArr?.reduce((acc, cur) => {
      if (!cur.selectedOption) return acc
      const rightAnswerId =
        cur?.options[cur?.options.findIndex((x) => x.isRight)]._id
      if (cur?.selectedOption === rightAnswerId) {
        return acc + cur.points
      }
      if (cur?.selectedOption !== rightAnswerId) {
        return acc - (cur.points / 100) * 25
      }
      return acc
    }, 0)
    return score
  }
  const path = useLocation().pathname
  useEffect(() => {
    if (timeCounter > 0 && path === "/quiz") {
      const timer = setTimeout(() => {
        setTimeCounter(timeCounter - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
    if (timeCounter === 0) {
      setScore(
        (prev) => (prev = calculateScore(state?.currentCategory?.questions))
      )
      navigate("/final")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeCounter])

  const length = state?.currentCategory?.questions?.length
  if (length === 0) {
    return <div>Loading....</div>
  }
  return (
    <div>
      {
        <div className="flex flex-col justify-evenly h-screen">
          <QuizCard
            key={index}
            questionObj={state?.currentCategory?.questions[index]}
            currentQuestion={index}
            length={length}
            topic={state?.currentCategory?.topic}
          />
          <div className="flex justify-evenly">
            {index !== 0 && (
              <button
                className="bg-yellow-400 px-5 py-2 rounded font-bold text-black"
                onClick={() =>
                  setIndex((prev: number) => (prev !== 0 ? prev - 1 : prev))
                }
              >
                Previous
              </button>
            )}
            <div className="bg-yellow-400 px-3 py-2 flex rounded font-bold text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {timeCounter}
            </div>
            <button
              className="bg-yellow-400 px-5 py-2 rounded font-bold text-black"
              onClick={() => {
                // setIndex((prev) => (prev < length - 1 ? prev + 1 : prev))
                setScore(
                  (prev) =>
                    (prev = calculateScore(state?.currentCategory?.questions))
                )

                if (index === length - 1) {
                  navigate("/final")
                } else {
                  setIndex(index + 1)
                }
              }}
            >
              {index === length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      }
    </div>
  )
}
