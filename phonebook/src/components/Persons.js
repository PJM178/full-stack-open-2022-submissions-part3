import React from 'react'
import Person from './Person'

const Persons = (props) => {
    return (
        <ul>
            {props.names.map(person =>
                <Person key={person.id} person={person} deleteName={props.delete} />
            )}
            {/* {props.names.map(person =>
                <li>{person.name} {person.number}</li>
            )} */}
        </ul>
    )
}

export default Persons