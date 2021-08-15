import React from 'react'

const Message = ({ variant, children }) => {
    return (
        <p className={`text-${variant}`}>
            {children}
        </p>
    )
}

export default Message
