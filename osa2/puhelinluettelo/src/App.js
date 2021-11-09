import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Contacts = ({persons, personsFiltered, filter, handleDelete}) => {
  if(filter === '') {
    return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) =>
        <Contact key={person.name} person={person} handleDelete={handleDelete}/>)}
    </div>  
    )
  } else
  return (
    <div>
      <h2>Numbers</h2>
      {personsFiltered.map((person) =>
        <Contact key={person.name} person={person} handleDelete={handleDelete} />)}
    </div> 
  )
}

const Contact = ({person, handleDelete}) => {
  return (
    <div>
      <p>{person.name} {person.number} <button onClick={() => handleDelete(person)}>Delete</button></p>
    </div>
  )
}

const Filter = ({filter, handleFilter}) => {
  return (
    <div>
      filter: <input value={filter} onChange={handleFilter}/>
    </div>
  )
}

const AddForm = (props) => {
  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={props.addName}>
        <div>
          name: <input value={props.newName} onChange={props.NameChange}/>
          <br/>
          number: <input value={props.newNumber} onChange={props.NumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Notification = ({message}) => {
  if(message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
    )
}

const Error = ({message}) => {
  if(message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [copy, setCopy] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    getPersons()
  }, [])

  const getPersons = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  const nameExist = () => {
    return persons.find(person => {
      return person.name.toLowerCase() === newName.toLowerCase()
    })
  }

  const filterNames = (arr, query) => {
    return arr.filter(contact => {
      return contact.name.toLowerCase().includes(query.toLowerCase())
    })
  }

  const showMessage = (message) => {
    setSuccessMessage(message)
      setTimeout(()=> {
      setSuccessMessage(null)
    }, 3000)
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    } 
    const check = nameExist()
    if(check !== undefined) {
      const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(confirmation){
        personService
          .modify(check.id, personObject)
          .then(data => {
            showMessage(`Changed number of ${data.name}`)
            getPersons()
          })
          .catch(error => {
            setErrorMessage(`Information of ${personObject.name} has already been removed from the server`)
            setTimeout(()=> {
              setErrorMessage(null)
            }, 5000)
            getPersons()
          })
      }
    } else {  
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setCopy(persons)
        setNewName('')
        setNewNumber('')
        showMessage(`Added ${returnedPerson.name}`)
      })    
    }
  }

  const handleDelete = (person) => {
    const confirmation = window.confirm(`Are you  sure you want to delete ${person.name}`)
    if(confirmation){
      personService
      .remove(person.id)
      .then(response => {
        showMessage(`Deleted ${person.name}`)  
        getPersons()   
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
 
  const handleFilter = (event) => {
    setFilter(event.target.value)
    const copy = [...persons]
    setCopy(filterNames(copy, event.target.value))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Error message={errorMessage} />
      <Filter filter={filter} handleFilter={handleFilter}/>
      <AddForm 
      addName={addName} 
      newName={newName} 
      newNumber={newNumber} 
      NameChange={handleNameChange} 
      NumberChange={handleNumberChange}
      />
      <Contacts 
      persons={persons} 
      personsFiltered={copy} 
      filter={filter}
      handleDelete={handleDelete}
      />
    </div>
  )
}

export default App