import { useStateContext } from "context/StateProvider"
import React from "react"

export const LeaderBoard = () => {
  const {
    state: { scoreData },
  } = useStateContext()
  if (scoreData.length === 0)
    return (
      <div className="text-yellow-400 mt-20 p-6 text-center">
        You are First Visitor of Our Site Play Some Game And Save To Leader
        Board
      </div>
    )
  return (
    <div className="text-yellow-400 mt-20 p-6  md:w-[800px] ">
      <h1 className="text-yellow-200 text-center font-semibold">LeaderBoard</h1>
      <div className="flex justify-between w-full text-center ">
        <p className="text-white  font-semibold border-2 w-full">Topic</p>
        <p className="text-white  font-semibold text-center border-2 w-full">
          UserName
        </p>
        <p className="text-white  font-semibold  border-2 w-full">UserScore</p>
      </div>
      {scoreData.map((score, index) => (
        <div key={index} className="flex justify-between w-full text-center">
          <p className="text-yellow-300  font-semibold border-2 w-full">
            {score.quizId.topic}
          </p>
          <p className="text-yellow-300  font-semibold text-center border-2 w-full">
            {score.name}
          </p>
          <p className="text-yellow-300  font-semibold  border-2 w-full">
            {score.score}
          </p>
        </div>
      ))}
    </div>
  )
}
