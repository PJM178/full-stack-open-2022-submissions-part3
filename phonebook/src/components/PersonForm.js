import React from 'react'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.submit}>
        <div>
          <div>name: <input name="name" value={props.name} onChange={props.function} /></div> 
          <div>number: <input name="number" value={props.number} onChange={props.function} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm