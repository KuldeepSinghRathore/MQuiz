import React from "react"
import { useNavigate } from "react-router-dom"

export const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col  items-center justify-center h-screen">
      <h1 className=" text-yellow-400 text-center">404 Page Not Found!!</h1>
      <button
        onClick={() => navigate("/")}
        className="bg-yellow-400 mt-3 px-5 py-2 rounded font-bold text-black"
      >
        Back To Home
      </button>
    </div>
  )
}
