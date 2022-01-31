import { createContext, useContext, useReducer, useState } from "react"
import { CONTEXTTYPE } from "types/types"
import axios from "axios"
import { useEffect } from "react"
import { API } from "API"
import { initialState, reducer } from "./reducer"
import { useAuthContext } from "./AuthProvider"

export const StateContext = createContext<CONTEXTTYPE>({} as CONTEXTTYPE)

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { token } = useAuthContext()
  const [score, setScore] = useState<number>(0)

  useEffect(() => {
    const getQuizData = async (url: string) => {
      try {
        const { data, status } = await axios.get(url)

        if (status === 200) {
          dispatch({ type: "LOAD_DATA", payload: data.quizzes })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getQuizData(`${API}/quizzes`)
  }, [])
  useEffect(() => {
    const getScoreData = async (url: string, token: any) => {
      try {
        const { data, status } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (status === 200) {
          dispatch({ type: "LOAD_SCORE", payload: data.scores })
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (token) {
      getScoreData(`${API}/score`, token)
    }
  }, [token])

  return (
    <StateContext.Provider value={{ state, dispatch, score, setScore }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
