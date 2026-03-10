import { searchNotes } from "../../api/notesApi"

import "./index.css"

const SearchBar = ({ setNotes }) => {

  const handleSearch = async e => {

    const query = e.target.value

    const results = await searchNotes(query)

    setNotes(results)
  }

  return (

    <div className="search-wrapper">
      <input
        className="search"
        placeholder="Search notes..."
        onChange={handleSearch}
      />
    </div>

  )
}

export default SearchBar