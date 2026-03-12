import { useState, useRef, useEffect } from "react"

import { API_URL } from "../../api/config"
import { getToken } from "../../utils/auth"
import { useNotes } from "../../context/NotesContext"
import FormatToolbar from "../FormatToolbar"

import "./index.css"

const NoteEditor = () => {

  const { addNote } = useNotes()

  const [title, setTitle] = useState("")
  const [important, setImportant] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  const editorRef = useRef(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = ""
    }
  }, [])

  const handleCreate = async () => {

    const content = editorRef.current?.innerHTML || ""
    const textContent = editorRef.current?.innerText?.trim() || ""

    const errors = {}
    if (!title.trim()) errors.title = "Title is required"
    if (!textContent) errors.content = "Content is required"

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})

    const token = getToken()

    const response = await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, content, important })
    })

    const newNote = await response.json()

    setTitle("")
    setImportant(false)
    if (editorRef.current) editorRef.current.innerHTML = ""

    addNote(newNote)
  }

  return (

    <div className="editor">

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      {fieldErrors.title && <p className="editor-field-error">{fieldErrors.title}</p>}

      <FormatToolbar editorRef={editorRef} />

      <div
        ref={editorRef}
        className="editor-content"
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Write your note..."
      />
      {fieldErrors.content && <p className="editor-field-error">{fieldErrors.content}</p>}

      <label className="editor-important-label">
        <input
          type="checkbox"
          checked={important}
          onChange={e => setImportant(e.target.checked)}
        />
        Mark as Important ⭐
      </label>

      <button className="editor-save-btn" onClick={handleCreate}>
        Save Note
      </button>

    </div>

  )
}

export default NoteEditor

