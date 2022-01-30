import { CategoryPage } from "pages/CategoryPage"
import { ReviewPage } from "pages/ReviewPage"
import { Login } from "pages/Login"
import { QuizPage } from "pages/QuizPage"
import { SignUp } from "pages/SignUp"
import { Routes, Route } from "react-router-dom"
import "./App.css"
import { Header } from "components/Header"
import { NotFoundPage } from "pages/NotFoundPage"
import { LeaderBoard } from "pages/LeaderBoard"
import { PrivateRoutes } from "utils/PrivateRoutes"
import { LogOutPage } from "pages/LogOutPage"
import { useStateContext } from "context/StateProvider"
import loader from "assets/loader.svg"
function App() {
  const { state } = useStateContext()

  // if () {
  //   return (

  //   )
  // }

  return (
    <>
      <Header />
      {state.quizData.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <img src={loader} alt="loader" />
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto mt-6   ">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoutes>
                  <CategoryPage />
                </PrivateRoutes>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/quiz"
              element={
                <PrivateRoutes>
                  <QuizPage />
                </PrivateRoutes>
              }
            />
            <Route
              path="/logout"
              element={
                <PrivateRoutes>
                  <LogOutPage />
                </PrivateRoutes>
              }
            />
            <Route
              path="/quiz"
              element={
                <PrivateRoutes>
                  <QuizPage />
                </PrivateRoutes>
              }
            />
            <Route
              path="/final"
              element={
                <PrivateRoutes>
                  <ReviewPage />
                </PrivateRoutes>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <PrivateRoutes>
                  <LeaderBoard />
                </PrivateRoutes>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App
