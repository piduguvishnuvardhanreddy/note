import "./index.css"

const fonts = [
  "Inter",
  "Playfair Display",
  "Lora",
  "Nunito",
  "Roboto Mono",
  "Dancing Script"
]

const FontPicker = ({ font, setFont }) => {

  return (

    <select
      className="font-picker"
      value={font}
      onChange={e => setFont(e.target.value)}
    >

      {fonts.map(f => (
        <option key={f} value={f}>{f}</option>
      ))}

    </select>

  )
}

export default FontPicker