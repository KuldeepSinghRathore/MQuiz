import { CategoryPage } from "pages/CategoryPage"
import { Login } from "pages/Login"
import { QuizPage } from "pages/QuizPage"
import { SignUp } from "pages/SignUp"
import { Routes, Route } from "react-router-dom"
import "./App.css"

function App() {
  return (
    <div className="max-w-screen-xl mx-auto   ">
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
      {/* <Rule /> */}
    </div>
  )
}

export default App
