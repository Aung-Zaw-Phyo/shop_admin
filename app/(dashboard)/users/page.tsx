import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { getUsers } from './_action';
import { columns } from "./columns";
import { DataTable } from '@/components/ui/data-table';

const page = async () => {
    const data = await getUsers();
    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-lg'>All Users</h1>
                <Link href='/categories/create'><Button className='uppercase'>Create</Button></Link>
            </div>
            <div className='p-4 bg-white rounded'>
                {/* <DataTable columns={columns} data={data}/> */}
            </div>
        </>
    )
}

export default page