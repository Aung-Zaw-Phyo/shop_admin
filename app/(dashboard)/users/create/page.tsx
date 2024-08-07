import React from 'react'
import Button from '@mui/material/Button';
import Link from 'next/link';
import CreateForm from '@/components/templates/users/CreateForm';

const page = () => {
    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-lg'>Create User</h1>
                <Link href='/users'>
                    <Button className='uppercase !px-4 !py-2' variant="contained">Back</Button>
                </Link>
            </div>
            <div className='p-4 bg-white rounded'>
                <CreateForm />
            </div>
        </>
    )
}

export default page