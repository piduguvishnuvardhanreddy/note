import { deleteNote } from "../../api/notesApi"

import "./index.css"

const NoteCard = ({ note, refresh }) => {

  const handleDelete = async () => {

    const confirmDelete =
      window.confirm("Delete this note?")

    if (!confirmDelete) return

    await deleteNote(note._id)

    refresh()
  }

  return (

    <div
      className="note-card"
      style={{ fontFamily: note.font }}
    >

      <h3>{note.title}</h3>

      <p>{note.content}</p>

      <button className="note-delete-btn" onClick={handleDelete}>
        Delete
      </button>

    </div>

  )
}

export default NoteCard