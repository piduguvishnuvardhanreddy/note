import { createContext, useContext, useEffect, useState } from "react"

import { API_URL } from "../api/config"
import { getToken } from "../utils/auth"

const NotesContext = createContext(null)

export const NotesProvider = ({ children }) => {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        const loadNotes = async () => {
            const token = getToken()
            const response = await fetch(`${API_URL}/notes`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await response.json()
            setNotes(Array.isArray(data) ? data : [])
        }
        loadNotes()
    }, [])

    const addNote = newNote => {
        setNotes(prev => [newNote, ...prev])
    }

    const deleteNote = async id => {
        const confirmed = window.confirm("Delete this note?")
        if (!confirmed) return

        const token = getToken()
        await fetch(`${API_URL}/notes/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })

        setNotes(prev => prev.filter(n => n._id !== id))
    }

    const saveNote = updatedNote => {
        setNotes(prev => prev.map(n => n._id === updatedNote._id ? updatedNote : n))
    }

    const toggleImportant = async id => {
        const note = notes.find(n => n._id === id)
        if (!note) return

        const newImportant = !note.important

        // Optimistic update
        setNotes(prev => prev.map(n => n._id === id ? { ...n, important: newImportant } : n))

        const token = getToken()
        try {
            const response = await fetch(`${API_URL}/notes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title: note.title, content: note.content, important: newImportant })
            })
            const updated = await response.json()
            setNotes(prev => prev.map(n => n._id === id ? updated : n))
        } catch {
            // Revert on failure
            setNotes(prev => prev.map(n => n._id === id ? { ...n, important: note.important } : n))
        }
    }

    return (
        <NotesContext.Provider value={{ notes, addNote, deleteNote, saveNote, toggleImportant }}>
            {children}
        </NotesContext.Provider>
    )
}

export const useNotes = () => useContext(NotesContext)
