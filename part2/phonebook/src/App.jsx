import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [personsSearch, setPersonsSearch] = useState([])
  const [all, setAll] = useState(true)

  // agregar persona
  const addPerson = (event) => {
    event.preventDefault(); // evitar recargar página

    let exists = false;
    for(const person of persons) {
      if(person.name == newName) {
        exists = true;
        break;
    }
  }

    if(exists) alert(`${newName} is already added to phonebook`)
    else {
      const personObject = {'name': newName, 'number': newNumber}
      setPersons(persons.concat(personObject))
      setAll(true)
      setNewName('')
    }

  }

  // manejo de cambios
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    const filter = event.target.value
    setNewSearch(filter)
    if(filter == '') setAll(true)
    else {
      setAll(false)
      setPersonsSearch(persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={newSearch} handler={handleSearchChange}/>
      <h3>add a new</h3>
      <PersonForm function={addPerson} texts={['name: ','number: ']} data={[newName,newNumber]} handlers={[handleNameChange,handleNumberChange]}/>
      <h2>Numbers</h2>
      <Persons all={all} persons={persons} personsSearch={personsSearch}/>
    </div>
    
  )
}

export default App