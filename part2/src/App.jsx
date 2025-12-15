import Course from './components/Course'
import Note from './components/Note'
import { useState } from 'react'

const CoursesApp = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((course) => {
        return <Course course={course} />
      })}
    </div>
  )
}

const NotesApp = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('enter a note here!')
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1)
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

const Person = ({name,number}) => (<>{name}, #{number}</>)

const Persons = ({persons}) => {
  const [filter, setFilter] = useState('')

  const handleFilter = (event) => setFilter(event.target.value)

  const filtered = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
  <>
  <h3>People in the Phonebook</h3>
  <ul>
  {filtered.map((x) =>
      <li key={x.name}>
        <Person name={x.name} number={x.number} />
      </li>
    )}
  </ul>
  Filter names by: <input value={filter} onChange={handleFilter} />
  </>
  )
}

const PersonEntryForm = ({callback}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    callback({newName, newNumber})
    setNewName('')
    setNewNumber('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
        <br></br>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 

  const addEntry = ({newName, newNumber}) => {
    const entryObject = {
      name: newName,
      number: newNumber,
    }

    const isNotDuplicate = (person) => person.name !== newName

    if (persons.every(isNotDuplicate)) {
      setPersons(persons.concat([entryObject]))
    } else {
      window.alert(`${newName} is already in the phonebook!`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Persons persons={persons} />
      <h3>Add a Person</h3>
      <PersonEntryForm callback={addEntry} />
    </div>
  )
}

export default App
