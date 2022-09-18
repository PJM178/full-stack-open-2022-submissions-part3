import React from 'react'

const Filter = (props) => {
    return (
        <div>filter shown with <input name="search" value={props.value} onChange={props.function} /></div>
    )
}

export default Filter