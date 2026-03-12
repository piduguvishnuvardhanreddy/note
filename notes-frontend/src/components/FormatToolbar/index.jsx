import { useState, useEffect } from "react"
import "./index.css"

const FormatToolbar = ({ editorRef }) => {

    const [active, setActive] = useState({
        bold: false,
        italic: false,
        underline: false
    })

    const updateActive = () => {
        setActive({
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
            underline: document.queryCommandState("underline")
        })
    }

    useEffect(() => {
        document.addEventListener("selectionchange", updateActive)
        return () => document.removeEventListener("selectionchange", updateActive)
    }, [])

    const applyFormat = command => {
        editorRef.current?.focus()
        document.execCommand(command, false, null)
        updateActive()
    }

    return (
        <div
            className="format-toolbar"
            onMouseDown={e => e.preventDefault()}
        >

            <button
                type="button"
                className={`fmt-btn ${active.bold ? "fmt-active" : ""}`}
                title="Bold"
                onClick={() => applyFormat("bold")}
            >
                <b>B</b>
            </button>

            <button
                type="button"
                className={`fmt-btn fmt-italic ${active.italic ? "fmt-active" : ""}`}
                title="Italic"
                onClick={() => applyFormat("italic")}
            >
                <i>I</i>
            </button>

            <button
                type="button"
                className={`fmt-btn fmt-underline ${active.underline ? "fmt-active" : ""}`}
                title="Underline"
                onClick={() => applyFormat("underline")}
            >
                <u>U</u>
            </button>

            <button
                type="button"
                className="fmt-btn"
                title="Bullet List"
                onClick={() => applyFormat("insertUnorderedList")}
            >
                ☰
            </button>

        </div>
    )
}

export default FormatToolbar
