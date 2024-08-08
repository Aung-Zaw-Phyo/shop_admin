import React from 'react'
import { Button } from '@mui/material';
import Link from 'next/link';
import { getAdmin } from '../../_action';
import EditForm from '@/components/templates/admins/EditForm';

const page = async ({ params }: { params: { adminId: number } }) => {
    const data = await getAdmin(params.adminId);
    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-lg'>Edit Admin</h1>
                <Link href='/admins'>
                    <Button className='uppercase !px-4 !py-2' variant="contained">Back</Button>
                </Link>
            </div>
            <div className='p-4 bg-white rounded'>
                <EditForm admin={data} />
            </div>
        </>
    )
}

export default page