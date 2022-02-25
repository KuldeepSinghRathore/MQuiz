import React, { useState } from "react"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { API } from "API"
import { useAuthContext } from "context/AuthProvider"
export type UserSubmitForm = {
  email: string
  password: string
}
export type ServerError = {
  message: string
}
export const Login: React.FC = () => {
  const navigate = useNavigate()
  const { setToken, setUserName, setUserId } = useAuthContext()
  const [isError, setError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")
  const [formValue, setFormValue] = React.useState<UserSubmitForm>({
    email: "kuldeepsingh@gmail.com",
    password: "123456",
  })
  const [isLoggingIn, setLoggingIn] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setFormValue({ ...formValue, [name]: value })
  }

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoggingIn(true)
    try {
      const { data, status } = await axios.post(`${API}/login`, formValue)

      if (status === 200) {
        setToken(data.token)
        setUserName(data.name)
        setUserId(data.userId)
        localStorage.setItem("userId", JSON.stringify(data.userId))
        localStorage.setItem("token", JSON.stringify(data.token))
        localStorage.setItem("username", JSON.stringify(data.name))
        setLoggingIn(false)
        navigate("/")
      }
    } catch (error) {
      console.log({ error })

      if (axios.isAxiosError(error)) {
        setLoggingIn(false)
        setError(true)
        const serverError = error as AxiosError<ServerError>
        if (serverError && serverError?.response) {
          console.log({ serverError })
          const errorMessage = serverError?.response?.data?.message
          setErrorMessage(errorMessage)
        }
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formValue.email === "" || formValue.password === "") {
      setError(true)
      setErrorMessage("Please enter email and password")
    } else {
      // setIsSubmit(true)
      loginUser(event)
    }
  }

  return (
    <div className="bg-black h-screen  flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-yellow-500 w-fit max-w-md max-h-[80%] shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="text-center font-semibold">
          New User{" "}
          <span
            className="font-extrabold cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            SignUp
          </span>
        </h1>

        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formValue.email}
            autoComplete="false"
            className={`shadow appearance-none border rounded w-full py-2 px-3 bg-black  text-yellow-200 leading-tight focus:outline-none focus:shadow-outline`}
          />
        </div>
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formValue.password}
            className={`shadow appearance-none border rounded w-full py-2 px-3 bg-black  text-yellow-200 leading-tight focus:outline-none focus:shadow-outline`}
          />
          <div className="text-red-700 font-extrabold text-xs italic">
            {isError ? errorMessage : ""}
          </div>
        </div>

        <div className="flex justify-between mt-3">
          <button
            type="submit"
            className="bg-black  hover:text-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isLoggingIn ? "Logging In..." : "Login"}
          </button>
          <button
            type="button"
            className="bg-black  hover:text-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
