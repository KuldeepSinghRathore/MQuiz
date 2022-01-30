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
      } else if (cur?.selectedOption !== rightAnswerId) {
        return acc - (cur.points / 100) * 25
      }
      return acc
    }, 0)
    return score
  }
  let path = useLocation().pathname
  useEffect(() => {
    if (timeCounter > 0 && path === "/quiz") {
      let timer = setTimeout(() => {
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
  }, [timeCounter])

  const length = state?.currentCategory?.questions?.length
  if (length === 0) {
    return <div>Loading....</div>
  }
  return (
    <>
      <div>
        {
          <div className="flex flex-col justify-evenly h-screen">
            <span className="text-white font-extrabold">
              0{(timeCounter / 60).toFixed(2)}
            </span>
            {/* {(timeCounter % 3600) / 60}
            {timeCounter % 60} */}
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
              <button className="bg-yellow-400 px-5 py-2 rounded font-bold text-black">
                Timer
              </button>
              <button
                className="bg-yellow-400 px-5 py-2 rounded font-bold text-black"
                onClick={() => {
                  // setIndex((prev) => (prev < length - 1 ? prev + 1 : prev))
                  setScore(
                    (prev) =>
                      (prev = calculateScore(state?.currentCategory?.questions))
                  )

                  index === length - 1
                    ? navigate("/final")
                    : setIndex(index + 1)
                }}
              >
                {index === length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        }
      </div>
    </>
  )
}
