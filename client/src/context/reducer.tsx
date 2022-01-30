import { ACTIONTYPE, InitialState } from "types/types"

export const initialState: InitialState = {
  currentCategory: {} as InitialState["currentCategory"],
  quizData: [] as InitialState["quizData"],
}

export const reducer = (
  state: InitialState,
  action: ACTIONTYPE
): InitialState => {
  switch (action.type) {
    case "LOAD_DATA":
      console.log(action.payload)

      return {
        ...state,

        quizData: action.payload,
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
    default:
      return state
  }
}
