import { useState } from "react"

import { createNote } from "../../api/notesApi"
import FontPicker from "../FontPicker"

import "./index.css"

const NoteEditor = ({ refresh }) => {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [font, setFont] = useState("Inter")

  const handleCreate = async () => {

    if (!title || !content) return

    await createNote({
      title,
      content,
      font
    })

    setTitle("")
    setContent("")

    refresh()
  }

  return (

    <div className="editor">

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <FontPicker
        font={font}
        setFont={setFont}
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button className="editor-save-btn" onClick={handleCreate}>
        Save Note
      </button>

    </div>

  )
}

export default NoteEditor