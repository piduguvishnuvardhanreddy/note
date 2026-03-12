import "./index.css"

const NoteCard = ({ note, onEdit, onDelete, onToggleImportant }) => {

  return (

    <div
      className={`note-card${note.important ? " note-card--important" : ""}`}
      style={{ fontFamily: note.font }}
    >

      <div className="note-card-header">
        <h3>{note.title}</h3>
        <button
          className={`note-star-btn${note.important ? " note-star-btn--active" : ""}`}
          onClick={() => onToggleImportant(note._id)}
          title={note.important ? "Unmark as important" : "Mark as important"}
        >
          ⭐
        </button>
      </div>

      <div
        className="note-card-content"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />

      <div className="note-card-actions">

        <button className="note-edit-btn" onClick={() => onEdit(note)}>
          Edit
        </button>

        <button className="note-delete-btn" onClick={() => onDelete(note._id)}>
          Delete
        </button>

      </div>

    </div>

  )
}

export default NoteCard

