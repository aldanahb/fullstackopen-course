import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonService from './services/persons'
import { ExitMessage, ErrorMessage } from './components/Message'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [personsSearch, setPersonsSearch] = useState([])
  const [exitMessage, setExitMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // recuperar información del servidor json
  const hook = () => {
    PersonService.getAllPersons().then(persons => {setPersons(persons), setPersonsSearch(persons)})
  }

  useEffect(hook,[])

  // agregar persona
  const addPerson = event => {
    event.preventDefault() // evitar recargar página

    let personObject

    const findPerson = persons.find(p => p.name.trim() === newName.trim())

    if(findPerson && findPerson.number.trim() == newNumber.trim()) {
      alert(`${newName} is already added to phonebook`)
    }
    else if(findPerson && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personObject = {...findPerson, number: newNumber}
      updatePerson(personObject)
    }
    else if(!findPerson) {
      personObject = {'name': newName, 'number': newNumber}
      PersonService.createPerson(personObject).then(person => {
        let listPersonsUpdate = [...persons, person]
        setPersons(listPersonsUpdate)
        setPersonsSearch(listPersonsUpdate)

        // mostrar mensaje de éxito
        setExitMessage(`${newName} has been added to the list`)
        setTimeout(() => {
          setExitMessage(null)
        }, 5000)
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
    if(filter == '') setPersonsSearch(persons)
    else {
      setPersonsSearch(persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
    }
  }

  // actualizar persona
  const updatePerson = updPerson => {
    PersonService.updatePerson(updPerson).then(person => {
      const listPersonsUpdate = persons.map(p => p.id !== person.id ? p : person)
      setPersons(listPersonsUpdate)
      setPersonsSearch(listPersonsUpdate)
      // mostrar mensaje de éxito
      setExitMessage(`${newName}'s data has been updated`)
      setTimeout(() => {
          setExitMessage(null)
          }, 5000)
      setNewName('')
      setNewNumber('')
      }
    ).catch(() => {
        // mostrar mensaje de error
        setErrorMessage(`Information of ${newName} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
          }, 5000)
      }
    )
  }

  // eliminar persona
  const deletePerson = person => {
    if(window.confirm(`Delete ${person.name}?`)) {
      PersonService.deletePerson(person.id).then(() => {
      const listPersonsUpdate = persons.filter(p => p.id !== person.id)
      setPersons(listPersonsUpdate)
      setPersonsSearch(listPersonsUpdate)
    }
      ).catch(() => {
        // mostrar mensaje de error
        setErrorMessage(`Information of ${newName} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
          }, 5000)
        }
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={newSearch} handler={handleSearchChange}/>
      <h3>add a new</h3>
      <PersonForm function={addPerson} texts={['name','number']} data={[newName,newNumber]} handlers={[handleNameChange,handleNumberChange]}/>
      <ExitMessage message={exitMessage}/>
      <ErrorMessage message={errorMessage}/>
      <h2>Numbers</h2>
      <Persons personsSearch={personsSearch} deletePerson={deletePerson}/>
    </div>
  )
}

export default App