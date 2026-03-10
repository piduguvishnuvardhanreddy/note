import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { registerUser } from "../../api/authApi"

import "./index.css"

const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleRegister = async e => {
    e.preventDefault()

    const data = await registerUser({ name, email, password })

    if (data.message === "User registered") {
      navigate("/login")
    }
    else {
      setError(data.message)
    }
  }

  return (
    <div className="register-container">

      <form className="register-form" onSubmit={handleRegister}>

        <h2>Register</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

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

        <button type="submit">Register</button>

        {error && <p className="error">{error}</p>}

      </form>

    </div>
  )
}

export default Register