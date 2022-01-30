import { useAuthContext } from "context/AuthProvider"
import { useStateContext } from "context/StateProvider"
import { useNavigate } from "react-router-dom"

export const LogOutPage = () => {
  const { logOut } = useAuthContext()
  const { dispatch } = useStateContext()

  const navigate = useNavigate()

  return (
    <div className="mx-auto w-fit mt-20  flex flex-col ">
      <h1 className="font-extrabold bg-yellow-300 mt-10 ">
        Want To Logout Out!!
      </h1>
      <button
        className="bg-yellow-500 mb-10  mt-10 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded"
        onClick={() => logOut(dispatch)}
      >
        Log Out
      </button>
      <button
        className="bg-yellow-500 mb-10 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded"
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </div>
  )
}
