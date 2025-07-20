import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {

  const [note, setNote] = useState([])
  const [input, setInput] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch notes from backend
  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true)
        const res = await axios.get('http://localhost:5000/tasks')
        setNote(res.data)
      } catch (err) {
        console.log("Error While Fetching", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [])

  async function addNote(newtitle) {
    if (editMode) {
      await updateNote(editId, newtitle)
    } else {
      try {
        const res = await axios.post('http://localhost:5000/tasks', {
          title: newtitle
        })
        setNote([...note, res.data.newTask])
        setInput('')
      } catch (err) {
        console.log("err while writing", err)
      }
    }
  }

  async function deleteNote(id) {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`)
      const updatedNotes = note.filter((notes) => notes.id !== id)
      setNote(updatedNotes)
    } catch (err) {
      console.log("Error While Deleting", err)
    }
  }

  function editNote(notes) {
    setEditMode(true)
    setInput(notes.title)
    setEditId(notes.id)
  }

  async function updateNote(id, updatedTitle) {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, {
        title: updatedTitle
      })
      const updatedNotes = note.map((n) =>
        n.id === id ? { ...n, title: updatedTitle } : n
      )
      setNote(updatedNotes)
      setInput("")
      setEditMode(false)
      setEditId(null)
    } catch (err) {
      console.log("error while updating")
    }
  }

  return (
    <div className="notepad">
      <h1>Foxy Notes App</h1>
      {loading ? (
        <p className="loading-text">Loading notes...</p>
      ) : (
        <>
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Write a funky note..'
            />
            <button
              disabled={!input}
              onClick={() => addNote(input)}
            >
              {editMode ? "Update" : "Add"}
            </button>
          </div>
          <ul className="notes-list">
            {note.map((notes) => (
              <li className="note-item" key={notes.id}>
                <span>{notes.title} </span>
                <div>
                  <button onClick={() => deleteNote(notes.id)}>Delete</button>
                  <button onClick={() => editNote(notes)}>Edit</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <p className='credit'>built by nazam shiraz</p>
    </div>
  )
}

export default App
