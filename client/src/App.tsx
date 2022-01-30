import { CategoryPage } from "pages/CategoryPage"
import { ReviewPage } from "pages/ReviewPage"
import { Login } from "pages/Login"
import { QuizPage } from "pages/QuizPage"
import { SignUp } from "pages/SignUp"
import { Routes, Route } from "react-router-dom"
import "./App.css"
import { Header } from "components/Header"

function App() {
  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto mt-6   ">
        <Routes>
          <Route path="/" element={<CategoryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/final" element={<ReviewPage />} />
        </Routes>
        {/* <Rule /> */}
      </div>
    </>
  )
}

export default App
