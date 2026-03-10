import { API_URL } from "./config"
import { getToken } from "../utils/auth"

export const fetchNotes = async () => {

  const token = getToken()

  const response = await fetch(
    `${API_URL}/notes`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.json()
}

export const createNote = async note => {

  const token = getToken()

  const response = await fetch(
    `${API_URL}/notes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(note)
    }
  )

  return response.json()
}

export const deleteNote = async id => {

  const token = getToken()

  await fetch(
    `${API_URL}/notes/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export const searchNotes = async query => {

  const token = getToken()

  if (!query) return fetchNotes()

  const response = await fetch(
    `${API_URL}/notes/search?q=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.json()
}
