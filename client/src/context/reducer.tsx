import { ACTIONTYPE, InitialState } from "types/types"

export const initialState: InitialState = {
  currentCategory: {} as InitialState["currentCategory"],
  quizData: [] as InitialState["quizData"],
  scoreData: [] as InitialState["scoreData"],
}

export const reducer = (
  state: InitialState,
  action: ACTIONTYPE
): InitialState => {
  switch (action.type) {
    case "LOAD_DATA":
      return {
        ...state,

        quizData: action.payload,
      }
    case "LOAD_SCORE":
      return {
        ...state,

        scoreData: action.payload,
      }

    case "SET_CURRENT_CATEGORY":
      return {
        ...state,
        currentCategory: action.payload,
      }
    case "SET_SELECTED_OPTION":
      return {
        ...state,
        currentCategory: {
          ...state.currentCategory,
          questions: state.currentCategory.questions.map((question) => {
            return question._id === action.payload.questionId
              ? (question = {
                  ...question,
                  selectedOption: action.payload.optionId,
                })
              : question
          }),
        },
      }
    case "UPDATE_SCORE":
      const isExist = state.scoreData.find(
        (score) =>
          score.userId === action.payload.userId &&
          score.quizId._id === action.payload.quizId._id
      )
        ? true
        : false

      return {
        ...state,
        scoreData: isExist
          ? state.scoreData.map((scoreObj) => {
              return scoreObj.userId === action.payload.userId &&
                scoreObj.quizId._id === action.payload.quizId._id
                ? (scoreObj = { ...scoreObj, score: action.payload.score })
                : scoreObj
            })
          : [...state.scoreData, action.payload],
      }

    case "LOGOUT":
      return {
        ...state,
        currentCategory: {} as InitialState["currentCategory"],
        scoreData: [] as InitialState["scoreData"],
      }
    default:
      return state
  }
}
