import { useEffect, useState } from "react"

import Navbar from "../Navbar"
import SearchBar from "../SearchBar"
import NoteEditor from "../NoteEditor"
import NotesList from "../NotesList"

import { fetchNotes } from "../../api/notesApi"

import "./index.css"

const NotesPage = () => {

  const [notes, setNotes] = useState([])

  const loadNotes = async () => {

    const data = await fetchNotes()

    setNotes(data)
  }

  useEffect(() => {
    loadNotes()
  }, [])

  return (
    <div className="notes-page">

      <Navbar />

      <SearchBar setNotes={setNotes} />

      <NoteEditor refresh={loadNotes} />

      <NotesList notes={notes} refresh={loadNotes} />

    </div>
  )
}

export default NotesPage