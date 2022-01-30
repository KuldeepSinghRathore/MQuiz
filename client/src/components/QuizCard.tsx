import { useStateContext } from "context/StateProvider"
import { Options, Questions } from "types/types"

type QuizCardTypes = {
  questionObj: Questions
  topic: string
  length: number
  currentQuestion: number
}

export const QuizCard = ({
  questionObj,
  topic,
  length,
  currentQuestion,
}: QuizCardTypes) => {
  const { question, options } = questionObj
  const { dispatch } = useStateContext()
  return (
    <div className="mt-3">
      <div>
        <h2 className="bg-black py-3 text-center text-yellow-300 font-bold ">
          <span className="py-3 px-5  ">Topic : {topic}</span>{" "}
          {currentQuestion + 1}/{length}
        </h2>
        <h3 className="py-10 px-2 mt-3 font-medium text-center bg-yellow-300">
          {" "}
          {question}
        </h3>
      </div>
      <div className="md:flex  md:justify-evenly md:items-center gap-12 md:flex-wrap mt-10 cursor-pointer">
        {options?.map((option: Options) => (
          <div
            key={option._id}
            className={`py-5 font-semibold px-12 mb-3 bg-yellow-50 ${
              option._id === questionObj?.selectedOption &&
              "bg-orange-500 font-bold"
            } text-center `}
            onClick={() =>
              // console.log(option._id, questionObj._id, 'this is option')
              dispatch({
                type: "SET_SELECTED_OPTION",
                payload: { optionId: option._id, questionId: questionObj._id },
              })
            }
          >
            {option.text}
          </div>
        ))}
      </div>
    </div>
  )
}
