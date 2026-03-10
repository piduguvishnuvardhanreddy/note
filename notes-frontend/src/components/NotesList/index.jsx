import NoteCard from "../NoteCard"

import "./index.css"

const NotesList = ({ notes, refresh }) => {

  return (

    <div className="notes-list">

      {notes.map(note => (
        <NoteCard
          key={note._id}
          note={note}
          refresh={refresh}
        />
      ))}

    </div>

  )
}

export default NotesList