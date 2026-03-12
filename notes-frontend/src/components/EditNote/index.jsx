import { useState, useRef, useEffect } from "react"

import { API_URL } from "../../api/config"
import { getToken } from "../../utils/auth"
import FormatToolbar from "../FormatToolbar"

import "./index.css"

const EditNote = ({ note, onClose, onSave }) => {

    const [title, setTitle] = useState(note.title)
    const [important, setImportant] = useState(note.important || false)
    const [status, setStatus] = useState("idle")
    const [fieldErrors, setFieldErrors] = useState({})

    const editorRef = useRef(null)

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = note.content || ""
        }
    }, [])

    const handleSave = async () => {

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
        setStatus("loading")

        const token = getToken()

        const response = await fetch(`${API_URL}/notes/${note._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title, content, important })
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            alert(errorData.error || "Failed to update note")
            setStatus("idle")
            return
        }

        const updatedNote = await response.json()

        onSave(updatedNote)
    }

    return (
        <div className="edit-overlay" onClick={onClose}>

            <div
                className="edit-modal"
                onClick={e => e.stopPropagation()}
            >

                <div className="edit-modal-header">
                    <h3>Edit Note</h3>
                    <button className="edit-close-btn" onClick={onClose}>✕</button>
                </div>

                <input
                    className="edit-input"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                {fieldErrors.title && <p className="edit-field-error">{fieldErrors.title}</p>}

                <FormatToolbar editorRef={editorRef} />

                <div
                    ref={editorRef}
                    className="edit-content"
                    contentEditable
                    suppressContentEditableWarning
                    data-placeholder="Write your note..."
                />
                {fieldErrors.content && <p className="edit-field-error">{fieldErrors.content}</p>}

                <label className="edit-important-label">
                    <input
                        type="checkbox"
                        checked={important}
                        onChange={e => setImportant(e.target.checked)}
                    />
                    Mark as Important ⭐
                </label>

                <div className="edit-modal-actions">
                    <button className="edit-cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="edit-save-btn"
                        onClick={handleSave}
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "Saving..." : "Save Changes"}
                    </button>
                </div>

            </div>

        </div>
    )
}

export default EditNote

