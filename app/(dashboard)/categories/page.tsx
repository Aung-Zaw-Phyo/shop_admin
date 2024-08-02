import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { getCategories } from './_action';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

const page = async ({ searchParams }: {searchParams: { [key: string]: string }}) => {
    const page = searchParams.page;
    const data = await getCategories(page ?? 1);
    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-lg'>Categories</h1>
                <Link href='/categories/create'><Button className='uppercase'>Create</Button></Link>
            </div>
            <div className='p-4 bg-white rounded'>
                <DataTable columns={columns} data={data.items} meta={data.meta}/>
            </div>
        </>
    )
}

export default page