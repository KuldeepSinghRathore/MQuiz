import { useAuthContext } from "context/AuthProvider"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
export const Header = () => {
  const navigate = useNavigate()
  const { token, userName } = useAuthContext()
  return (
    <div className="bg-yellow-300 flex fixed inset-x-0 top-0 ease-out  justify-between font-bold py-4 px-7 shadow-current">
      <div
        onClick={() => navigate("/")}
        className="font-extrabold px-4 py-1 cursor-pointer bg-black text-yellow-300"
      >
        MQuiz
      </div>
      <div className="flex gap-12 items-center">
        <Link
          to="/"
          className="hidden md:block px-4 py-1  hover:bg-black hover:text-yellow-300"
        >
          Home
        </Link>
        {!token && (
          <Link
            to="/login"
            className="hidden md:block px-4 py-1 hover:bg-black hover:text-yellow-300"
          >
            Login
          </Link>
        )}
        <Link
          to="/leaderboard"
          className="px-4 py-1 hover:bg-black hover:text-yellow-300"
        >
          LeaderBoard
        </Link>
        <Link to="/logout">{userName && `Hi ${userName}`}</Link>
      </div>
    </div>
  )
}
