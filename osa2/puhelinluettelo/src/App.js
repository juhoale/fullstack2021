import React, { useState } from 'react'

const Contacts = ({ persons, personsFiltered, filter }) => {
  if(filter === '') {
    return (
      <div>
      <h2>Numbers</h2>
      {persons.map((person) =>
        <Contact key={person.name} person={person} />)}
    </div>  
    )
  } else
  return (
    <div>
      <h2>Numbers</h2>
      {personsFiltered.map((person) =>
        <Contact key={person.name} person={person} />)}
    </div> 
  )
}

const Contact = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
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

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [copy, setCopy] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  function nameExist() {
    return persons.some(person => {
      return person.name.toLowerCase() === newName.toLowerCase()
    })
  }

  function filterNames(arr, query) {
    return arr.filter(contact => {
      return contact.name.toLowerCase().includes(query.toLowerCase())
    })
  }

  const addName = (event) => {
    event.preventDefault()
    if(nameExist()) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setCopy(persons)
    setNewName('')
    setNewNumber('')
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
      />
    </div>
  )
}

export default App
