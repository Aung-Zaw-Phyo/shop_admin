import React from 'react'
import LoginForm from '@/components/templates/auth/LoginForm'


const page = () => {
  return (
    <div className="p-4 h-[100vh] flex justify-center items-center">
        <div className="mx-auto md:w-[400px] lg:w-[500px] p-4 py-6 shadow-lg bg-white rounded">
          <h1 className='mb-6 text-lg text-center'>Please login to access the panel</h1>
          <LoginForm/>
        </div>
    </div>
  )
}

export default page