import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import { API_URL } from "../../api/config"
import { setToken } from "../../utils/auth"

import "./index.css"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    const errors = {}
    if (!email.trim()) errors.email = "Email is required"
    if (!password.trim()) errors.password = "Password is required"

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.token) {
        setToken(data.token)
        navigate("/")
      }
      else {
        setError(data.message)
      }
    }
    catch (err) {
      setError("Network error. Please try again.")
    }
    finally {
      setLoading(false)
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
        {fieldErrors.email && <p className="error">{fieldErrors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {fieldErrors.password && <p className="error">{fieldErrors.password}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="error">{error}</p>}

        <p>
          No account?
          <Link to="/register">Register</Link>
        </p>

      </form>

    </div>
  )
}

export default Login