import type { ReactNode } from "react"
import React, { createContext, useContext, useState } from "react"
import { ACTIONTYPE } from "types/types"

export type TokenType = {
  token: string
}

// export type userNameType = {
//   userName: string
// }

type AuthContextType = {
  userName: string | null
  setUserName: React.Dispatch<React.SetStateAction<string | null>>
  token: TokenType | null
  setToken: React.Dispatch<React.SetStateAction<TokenType | null>>
  userId: string | null
  setUserId: React.Dispatch<React.SetStateAction<string | null>>
  logOut: (dispatch: DispatchType) => void
}

type AuthProviderProps = {
  children: ReactNode
}

type DispatchType = (value: ACTIONTYPE) => void

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  let savedUsername = JSON.parse(localStorage.getItem("username")!)
  let savedToken = JSON.parse(localStorage.getItem("token")!)
  let savedUserId = JSON.parse(localStorage.getItem("userId")!)

  const [userName, setUserName] = useState<string | null>(savedUsername || null)
  const [token, setToken] = useState<TokenType | null>(savedToken || null)
  const [userId, setUserId] = useState<string | null>(savedUserId || null)

  const logOut = (dispatch: DispatchType) => {
    setToken(null)
    setUserName(null)
    setUserId(null)
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
  }

  return (
    <AuthContext.Provider
      value={{
        userName,
        setUserName,

        token,
        setToken,
        userId,
        setUserId,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
