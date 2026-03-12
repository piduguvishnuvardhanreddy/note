import { useState } from "react"

import { useNotes } from "../../context/NotesContext"

import Navbar from "../Navbar"
import NoteEditor from "../NoteEditor"
import NoteCard from "../NoteCard"
import EditNote from "../EditNote"

import "./index.css"

const NotesPage = () => {

  const { notes, deleteNote, saveNote, toggleImportant } = useNotes()

  const [query, setQuery] = useState("")
  const [editingNote, setEditingNote] = useState(null)
  const [showImportant, setShowImportant] = useState(false)

  const filtered = notes
    .filter(note => showImportant ? note.important === true : true)
    .filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
    )

  return (
    <div className="notes-page">

      <Navbar />

      <div className="notes-filter-tabs">
        <button
          className={`filter-tab ${!showImportant ? "filter-tab--active" : ""}`}
          onClick={() => setShowImportant(false)}
        >
          All Notes
        </button>
        <button
          className={`filter-tab ${showImportant ? "filter-tab--active" : ""}`}
          onClick={() => setShowImportant(true)}
        >
          ⭐ Important
        </button>
      </div>

      <input
        className="notes-search"
        placeholder="Search notes..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {!showImportant && <NoteEditor />}

      <div className="notes-list">
        {filtered.length === 0 ? (
          <p className="notes-empty">
            {showImportant ? "No important notes yet. Star a note to pin it here!" : "No notes found."}
          </p>
        ) : (
          filtered.map(note => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={setEditingNote}
              onDelete={deleteNote}
              onToggleImportant={toggleImportant}
            />
          ))
        )}
      </div>

      {editingNote && (
        <EditNote
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onSave={note => { saveNote(note); setEditingNote(null) }}
        />
      )}

    </div>
  )
}

export default NotesPage

