import React from "react"
import { useNavigate } from "react-router-dom"
const Rules = [
  ` Select an answer for every question. Unanswered questions will not be considered.`,

  ` Click on the Submit button at the bottom of
          the page to have your answers graded`,
  ` you may review your
          answer-choices and compare them to the correct answers after your
          final attempt.`,
  ` Each question has 10 point`,
  ` If you Do  not Click on Save Scorr,
          your score will not saved.`,
  ` 25% Negative Points for Each Wrong Answer ! `,
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
              <div className="py-2 font-bold" key={index}>
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
