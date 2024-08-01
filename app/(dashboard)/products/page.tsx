import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataTableDemo } from '@/components/templates/products/DataTableDemo';

const page = () => {
  return (
    <div>
      {/* <div className='mb-4 flex justify-between'>
        <h1 className="text-xl">Products</h1>
        <div>
          <Button variant="contained">Create</Button>
        </div>
      </div> */}


      {/* <table className=' border border-slate-500 border-separate border-spacing-2 w-full'>
        <thead>
          <tr>
            <th className='text-start'>#</th>
            <th className='text-center'>Name</th>
            <th className='text-center'>Price</th>
            <th className='text-center'>InStock</th>
            <th className='text-center'>Sizes</th>
            <th className='text-center'>Colors</th>
            <th className='text-center'>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2</td>
            <td className='text-center'>Shirt</td>
            <td className='text-center'>20000 MMK</td>
            <td className='text-center'>Yes</td>
            <td className='text-center'>SM | MD | LG</td>
            <td className='text-center'>Black | White</td>
            <td className='text-center'>1 day ago</td>
          </tr>
          <tr>
            <td>3</td>
            <td className='text-center'>Shirt</td>
            <td className='text-center'>20000 MMK</td>
            <td className='text-center'>Yes</td>
            <td className='text-center'>SM | MD | LG</td>
            <td className='text-center'>Black | White</td>
            <td className='text-center'>1 day ago</td>
          </tr>
          <tr>
            <td>4</td>
            <td className='text-center'>Shirt</td>
            <td className='text-center'>20000 MMK</td>
            <td className='text-center'>Yes</td>
            <td className='text-center'>SM | MD | LG</td>
            <td className='text-center'>Black | White</td>
            <td className='text-center'>1 day ago</td>
          </tr>
          <tr>
            <td>5</td>
            <td className='text-center'>Shirt</td>
            <td className='text-center'>20000 MMK</td>
            <td className='text-center'>Yes</td>
            <td className='text-center'>SM | MD | LG</td>
            <td className='text-center'>Black | White</td>
            <td className='text-center'>1 day ago</td>
          </tr>
        </tbody>
      </table> */}
  
      <DataTableDemo/>
    </div>
  )
}

export default page