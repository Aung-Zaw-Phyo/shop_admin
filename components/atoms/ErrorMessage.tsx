import React from 'react'

const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <p className="text-red-700 mt-1">{message}</p>
    )
}

export default ErrorMessage