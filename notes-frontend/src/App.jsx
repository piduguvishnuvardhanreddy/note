import { BrowserRouter, Routes, Route } from "react-router-dom"

import { NotesProvider } from "./context/NotesContext"
import Login from "./components/Login"
import Register from "./components/Register"
import NotesPage from "./components/NotesPage"

import ProtectedRoute from "./routes/ProtectedRoute"

function App() {

  return (
    <NotesProvider>
      <BrowserRouter>

        <Routes>

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <NotesPage />
              </ProtectedRoute>
            }
          />

        </Routes>

      </BrowserRouter>
    </NotesProvider>
  )
}

export default App