import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"

import { loginUser } from "../../api/authApi"
import { setToken } from "../../utils/auth"
import { AuthContext } from "../../context/AuthContext"
import Loader from "../Loader"

import "./index.css"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState("")

  const { setIsAuth } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    setStatus("loading")

    const data = await loginUser({ email, password })

    if (data.token) {
      setStatus("success")
      setToken(data.token)
      setIsAuth(true)
      navigate("/")
    }
    else {
      setStatus("error")
      setError(data.message)
    }
  }

  const renderStatus = () => {
    switch (status) {

      case "loading":
        return <Loader />

      case "success":
        return <p className="success">Login successful!</p>

      case "error":
        return <p className="error">{error}</p>

      default:
        return null
    }
  }

  return (
    <div className="login-container">

      <form className="login-form" onSubmit={handleSubmit}>

        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit" disabled={status === "loading"}>Login</button>

        {renderStatus()}

        <p>
          No account?
          <Link to="/register">Register</Link>
        </p>

      </form>

    </div>
  )
}

export default Login