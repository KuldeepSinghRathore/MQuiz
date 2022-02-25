import { useStateContext } from "context/StateProvider"
import React, { useState } from "react"
import { ScoreType } from "types/types"

export const LeaderBoard = () => {
  const {
    state: { scoreData },
  } = useStateContext()
  const [selectedTopic, setSelectedTopic] = useState("")

  const sortByTopic = (topic: string) => {
    return scoreData.filter((score: ScoreType) => score.quizId.topic === topic)
  }
  const sortedData =
    selectedTopic === "" ? scoreData : sortByTopic(selectedTopic)
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
        {/* <p className="text-white  font-semibold border-2 w-full">Topic</p> */}
        <select
          name=""
          id=""
          className="text-white bg-black  font-semibold border-2 w-full"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="">All Topics</option>
          <option value="Bleach">Bleach</option>
          <option value="Game of Thrones">Game of Thrones</option>
          <option value="Harry Potter">Harry Potter</option>
        </select>
        <p className="text-white  font-semibold text-center border-2 w-full">
          UserName
        </p>
        <p className="text-white  font-semibold  border-2 w-full">UserScore</p>
      </div>
      {sortedData.map((score, index) => (
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
