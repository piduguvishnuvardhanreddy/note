import { useNavigate } from "react-router-dom"
import { removeToken } from "../../utils/auth"

import "./index.css"

const Navbar = () => {

  const navigate = useNavigate()

  const logout = () => {
    removeToken()
    navigate("/login")
  }

  return (

    <nav className="navbar">

      <h2>NotesReal</h2>

      <button className="navbar-logout" onClick={logout}>
        Logout
      </button>

    </nav>

  )
}

export default Navbar