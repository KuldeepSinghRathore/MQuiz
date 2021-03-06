import React from "react"
import { useNavigate } from "react-router-dom"
const Rules = [
  ` You will be given 2 questions.`,
  ` You will be given 60 seconds to answer all question.`,
  ` You will be given 10 point for each correct answer.`,
  ` You will be given -25% point for each wrong answer.`,
  ` You will be given 0 point for each unanswered question.`,
  ` Click on the Submit button at the bottom of the page to have your answers graded`,
  ` you may review your answer-choices and compare them to the correct answers after submission.`,
  ` If you Do  not Click on Save Score, your score will not saved.`,
]

type CloseModalType = {
  closeModal: (value: boolean) => void
}

export const Modal = ({ closeModal }: CloseModalType) => {
  const navigate = useNavigate()
  return (
    <div className="w-screen h-screen absolute inset-0 bg-black flex justify-center items-center">
      <div className=" md:w-[500px] md:h-[500px] bg-yellow-400 fixed flex p-4 gap-8 items-center flex-col rounded-r">
        <div className="flex justify-around w-full">
          {" "}
          <hr />
          <div className="text-center font-extrabold">Rules</div>
          <hr />
          <button
            onClick={() => closeModal(false)}
            className="bg-black px-4 py-2 rounded-[50%] font-bold text-yellow-200"
          >
            x
          </button>
        </div>
        <div>
          {Rules.map((rule, index) => {
            return (
              <div className="pt-1 font-bold" key={index}>
                {index + 1}. {rule}
              </div>
            )
          })}
        </div>
        <div className="flex justify-around w-full">
          <button
            onClick={() => navigate("/quiz")}
            className="bg-black px-5 py-2 rounded-full font-bold text-yellow-400"
          >
            Play
          </button>
        </div>
      </div>
    </div>
  )
}
