import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
// import axios from 'axios'
import Backend from './services/Backend'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState("")
  // const [checkConfirm, setCheckConfirm] = useState(true)

  const addName = (event) => {
    // console.log(checkConfirm)
    event.preventDefault()
    const duplicateName = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
    const nameObject = {
      name: newName,
      number: newNumber
      }
    // if (newName.length === 0) {
    //   setMessageClass('errorMessage')
    //   setMessage('Missing name field')
    //   setTimeout(() => {
    //     setMessage(null)
    //   }, 3000)
    // }
    if (duplicateName.length === 0) {
      Backend
        .newEntry(nameObject)
        .then(name => {
          setPersons(persons.concat(name))
          setNewName('')
          setNewNumber('')
          setMessageClass('successAdd')
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setNewName('')
          setNewNumber('')
          setMessageClass('errorMessage')
          setMessage(error.response.data.error)
          // console.log(error.response.data)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
    else {
      const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      const confirmDelete = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
      if (confirmDelete) {
        updateNumber(newName, nameObject)
      }
    }
  }

  useEffect(() => {
    Backend
      .getData()
      .then(names => {
        setPersons(names)
      })
  }, [])

  const deleteName = (id) => {
    const person = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)
    if (confirmDelete === true) {
      Backend
        .deleteEntry(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const updateNumber = (name, newEntry) => {
    const person = persons.find(person => person.name.toLowerCase() === name.toLowerCase())
    // const confirmDelete = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
    // if (confirmDelete) {
      Backend
        .updateEntry(person.id, newEntry)
        .then(returnedName => {
          setPersons(persons.map(entry => entry.name.toLowerCase() !== name.toLowerCase() ? entry : returnedName))
          setNewName('')
          setNewNumber('')
          setMessageClass('successAdd')
          setMessage(`Updated ${newName}'s number`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch((error) => {
          setNewName('')
          setNewNumber('')
          setMessageClass('errorMessage')
          setMessage(error.response.data.error)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          // setPersons(persons.filter(entry => entry.id !== person.id))
        })
    // } else {
    //   setCheckConfirm(confirmDelete)
    // }
  }

  const handleInputChange = (event) => {
    const target = event.target
    if (target.name === "name") {
      setNewName(target.value)
    }
    else if (target.name === "number") {
      setNewNumber(target.value)
    }    
    else if (target.name === "search") {
      setSearchField(target.value)
    }
  }

  const searchNames = (value) => value.filter(person => person.name.toLowerCase().includes(searchField.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} messageClass={messageClass} />
      <Filter value={searchField} function={handleInputChange}/>
      <h2>New entry</h2>
      <PersonForm name={newName} number={newNumber} function={handleInputChange} submit={addName}/>
      <h2>Numbers</h2>
      <Persons names={searchNames(persons)} delete={deleteName} />
    </div>
  )
}

export default App