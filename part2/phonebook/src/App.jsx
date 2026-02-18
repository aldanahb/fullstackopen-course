import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [personsSearch, setPersonsSearch] = useState([])
  const [all, setAll] = useState(true)

  // recuperar información del servidor json
  const hook = () => {
    axios.get('http://localhost:3001/persons').then(response => {setPersons(response.data)})
  }

  useEffect(hook,[])

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