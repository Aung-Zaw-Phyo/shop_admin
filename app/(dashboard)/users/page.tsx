import Link from 'next/link'
import React from 'react'
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@mui/material';
import { getUsers } from './_action';
import { userColumns } from '@/components/columns/user-columns';

const page = async ({ searchParams }: { searchParams: { [key: string]: number } }) => {
    const page = searchParams.page;
    const data = await getUsers(page ?? 1);
    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-lg'>Users</h1>
                <Link href='/users/create'>
                    <Button className='uppercase !px-4 !py-2' variant="contained">Create</Button>
                </Link>
            </div>
            <div className='p-4 bg-white rounded'>
                <DataTable
                    columns={userColumns}
                    data={data.items}
                    meta={data.meta}
                />
            </div>
        </>
    )
}

export default page