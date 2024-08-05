import React from 'react'

const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <p className="text-red-700">{message}</p>
    )
}

export default ErrorMessage