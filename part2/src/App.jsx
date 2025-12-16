import Course from './components/Course'
import Note from './components/Note'
import Notification from './components/Notification'
import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({persons, callback}) => {
  const [filter, setFilter] = useState('')

  const handleFilter = (event) => setFilter(event.target.value)

  const filtered = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
  <>
  <h3>People in the Phonebook</h3>
  <ul>
  {filtered.map((x) =>
      <li className='person' key={x.name}>
        <Person name={x.name} number={x.number} />
        <button onClick={() => callback(x)}>delete</button>
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
  useEffect(() => {
    personService
      .getAll()
      .then(notes => {
        setPersons(notes)
      })
  },[])

  const [persons, setPersons] = useState([]) 
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const displayWith = (message, setter) => {
    setter(message)
    setTimeout(() => {
      setter(null)
    }, 5000)
  }

  const updateEntry = (entry, newNumber) => {
    const updatedEntry = {...entry, number: newNumber }
    
    personService
      .update(updatedEntry.id, updatedEntry)
      .then(returnedEntry => {
        setPersons(persons.map(person => person.id === entry.id ? returnedEntry : person))
        displayWith(`Updated ${updatedEntry.name}'s number`, setNotification)
      })
      .catch(error => {
        displayWith(
          `Person ${updatedEntry.name} was already removed from the server`,
          setErrorMessage
        )
        setPersons(persons.filter(n => n.id !== id))
      })
  }

  const addEntry = ({newName, newNumber}) => {
    const isNotDuplicate = (person) => person.name !== newName

    const [personAlreadyExists] = persons.reduce(
      (acc, x) => isNotDuplicate(x) ? acc : acc.concat(x),
      [])

    if (!personAlreadyExists) {
      const entryObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(entryObject)
        .then(returnedEntry => {
          setPersons(persons.concat(returnedEntry))
        })
      displayWith(`${newName} has been added to the phonebook`, setNotification)
    } else {
      if (window.confirm(`${newName} is already in the phonebook! Would you like to update ${newName}'s number?'`)) {
        updateEntry(personAlreadyExists, newNumber)
      }
    }
  }

  const deleteEntry = (entry) => {
    if (window.confirm(`Are you sure you want to remove ${entry.name} from the phonebook?`)) {
      personService
        .remove(entry.id)
        .then(removedEntry => {
          console.log(removedEntry)
          setPersons(persons.filter(n => n.id !== removedEntry.id))
        })
      displayWith(`Removed ${entry.name} from the phonebook`, setNotification)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} className="notif"/>
      <Notification message={errorMessage} className="error"/>
      <Persons persons={persons} callback={deleteEntry} />
      <h3>Add a Person</h3>
      <PersonEntryForm callback={addEntry} />
    </div>
  )
}

export default App
