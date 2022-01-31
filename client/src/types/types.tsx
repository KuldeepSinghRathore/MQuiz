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
  scoreData: ScoreType[]
}
export type QuizIdType = {
  _id: string
  topic: string
}

export type ScoreType = {
  _id?: string
  userId: string | null
  quizId: QuizIdType
  score: number
  name: string | null
}
export type UserScoreType = ScoreType[]
export type ACTIONTYPE =
  | { type: "LOAD_DATA"; payload: Quiz[] }
  | { type: "LOAD_SCORE"; payload: ScoreType[] }
  | { type: "SET_CURRENT_CATEGORY"; payload: Quiz }
  | { type: "SET_SELECTED_OPTION"; payload: SelectedOption }
  | { type: "UPDATE_SCORE"; payload: ScoreType }
  | { type: "LOGOUT" }

export type CONTEXTTYPE = {
  state: InitialState
  dispatch: (action: ACTIONTYPE) => void
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
}
export type ServerErrorMessage = {
  message: string
}
