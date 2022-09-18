import React from "react"
import '../index.css'

const Notification = ({ message, messageClass }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={messageClass}>
        {message}
      </div>
    )
  }

export default Notification