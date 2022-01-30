export type Options = {
  _id: string
  text: string
  isRight: boolean
}

export type Questions = {
  _id: string
  question: string
  points: number
  selectedOption?: string
  options: Options[]
}

export type Quiz = {
  _id: string
  description: string
  topic: string
  image: string
  questions: Questions[]
}

export type SelectedOption = {
  questionId: string
  optionId: string
}

export type InitialState = {
  quizData: Quiz[]
  currentCategory: Quiz
}

export type ACTIONTYPE =
  | { type: "LOAD_DATA"; payload: Quiz[] }
  | { type: "SET_CURRENT_CATEGORY"; payload: Quiz }
  | { type: "SET_SELECTED_OPTION"; payload: SelectedOption }

export type CONTEXTTYPE = {
  state: InitialState
  dispatch: (action: ACTIONTYPE) => void
}
export type ServerErrorMessage = {
  message: string
}
