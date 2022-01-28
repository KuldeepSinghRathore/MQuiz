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
