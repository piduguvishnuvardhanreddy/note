import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { API_URL } from "../../api/config"

import "./index.css"

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  const navigate = useNavigate()

  const handleRegister = async e => {
    e.preventDefault()

    const errors = {}
    if (!username.trim()) errors.username = "Name is required"
    if (!email.trim()) errors.email = "Email is required"
    if (!password.trim()) errors.password = "Password is required"

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      })

      const data = await response.json()

      if (data.message === "User registered") {
        navigate("/login")
      }
      else {
        setError(data.message)
      }
    }
    catch (err) {
      setError("Network error. Please try again.")
    }
  }

  return (
    <div className="register-container">

      <form className="register-form" onSubmit={handleRegister}>

        <h2>Register</h2>

        <input
          placeholder="Name"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        {fieldErrors.username && <p className="error">{fieldErrors.username}</p>}

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

        <button type="submit">Register</button>

        {error && <p className="error">{error}</p>}

      </form>

    </div>
  )
}

export default Register