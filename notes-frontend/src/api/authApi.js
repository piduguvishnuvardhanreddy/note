import {API_URL} from "./config"

export const loginUser = async credentials => {

  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(credentials)
    }
  )

  return response.json()
}

export const registerUser = async data => {

  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    }
  )

  return response.json()
}