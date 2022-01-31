import React from "react"
import { Link, useNavigate } from "react-router-dom"
export const Header = () => {
  const navigate = useNavigate()
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
        <Link
          to="/login"
          className="hidden md:block px-4 py-1 hover:bg-black hover:text-yellow-300"
        >
          Login
        </Link>
        <Link
          to="/leaderboard"
          className="px-4 py-1 hover:bg-black hover:text-yellow-300"
        >
          LeaderBoard
        </Link>
        <Link to="/logout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6  "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
