import React from 'react'
import Button from '@mui/material/Button';

const page = () => {
  return (
    <div>
      <div className='mb-4 flex justify-between'>
        <h1 className="text-xl">Products</h1>
        <div>
          <Button variant="contained">Create</Button>
        </div>
      </div>

    </div>
  )
}

export default page