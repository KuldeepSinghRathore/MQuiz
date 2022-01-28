import { createContext, useContext, useReducer } from "react"
import { CONTEXTTYPE } from "types/quizContext.types"
import axios from "axios"
import { useEffect } from "react"
import { API } from "API"
import { initialState, reducer } from "./reducer"

export const StateContext = createContext<CONTEXTTYPE>({} as CONTEXTTYPE)

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const getQuizData = async (url: string) => {
      try {
        const { data, status } = await axios.get(url)

        if (status === 200) {
          console.log(data.quizzes)
          dispatch({ type: "LOAD_DATA", payload: data.quizzes })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getQuizData(`${API}/quizzes`)
  }, [])

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
