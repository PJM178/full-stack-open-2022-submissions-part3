import React from 'react'

const Person = ({ person, deleteName }) => {
    return (
        <li>{person.name} {person.number} <button onClick={() => deleteName(person.id)} >delete</button></li>
    )
}

export default Person