import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { StateProvider } from "./context/StateProvider"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "context/AuthProvider"
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StateProvider>
          <App />
        </StateProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
