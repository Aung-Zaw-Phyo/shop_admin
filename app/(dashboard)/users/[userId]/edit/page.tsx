import React from 'react'
import { Button } from '@mui/material';
import Link from 'next/link';
import EditForm from '@/components/templates/users/EditForm';
import { getUser } from '../../_action';

const page = async ({ params }: { params: { userId: number } }) => {
    const data = await getUser(params.userId);
    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-lg'>Edit User</h1>
                <Link href='/users'>
                    <Button className='uppercase !px-4 !py-2' variant="contained">Back</Button>
                </Link>
            </div>
            <div className='p-4 bg-white rounded'>
                <EditForm user={data} />
            </div>
        </>
    )
}

export default page