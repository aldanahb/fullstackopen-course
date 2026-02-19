import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonService from './services/persons'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [personsSearch, setPersonsSearch] = useState([])
  const [all, setAll] = useState(true)

  // recuperar información del servidor json
  const hook = () => {
    PersonService.getAllPersons().then(persons => {setPersons(persons)})
  }

  useEffect(hook,[])

  // agregar persona
  const addPerson = event => {
    event.preventDefault() // evitar recargar página

    let personObject

    const findPerson = persons.find(p => p.name === newName)

    if(findPerson && findPerson.number == newNumber) {
      alert(`${newName} is already added to phonebook`)
    }
    else if(findPerson && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personObject = {...findPerson, number: newNumber}
      updatePerson(personObject)
    }
    else if(!findPerson) {
      personObject = {'name': newName, 'number': newNumber}
      PersonService.createPerson(personObject).then(person => {
        setPersons(persons.concat(person))
        setAll(true)
        setNewName('')
        setNewNumber('')
        }
      )
    }
  }

  // manejo de cambios
  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = event => {
    const filter = event.target.value
    setNewSearch(filter)
    if(filter == '') setAll(true)
    else {
      setAll(false)
      setPersonsSearch(persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
    }
  }

  // actualizar persona
  const updatePerson = updPerson => {
    PersonService.updatePerson(updPerson).then(person => {
      const listPersonsUpdate = persons.map(p => p.id !== person.id ? p : person)
      setPersons(listPersonsUpdate)
      setNewName('')
      setNewNumber('')
      }
    )
  }

  // eliminar persona
  const deletePerson = person => {
    if(window.confirm(`Delete ${person.name}?`)) {
      PersonService.deletePerson(person.id).then(() => 
      setPersons(persons.filter(p => p.id !== person.id))
      )
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={newSearch} handler={handleSearchChange}/>
      <h3>add a new</h3>
      <PersonForm function={addPerson} texts={['name','number']} data={[newName,newNumber]} handlers={[handleNameChange,handleNumberChange]}/>
      <h2>Numbers</h2>
      <Persons all={all} persons={persons} personsSearch={personsSearch} deletePerson={deletePerson}/>
    </div>
    
  )
}

export default App