import Link from 'next/link'
import React from 'react'
import { getVariants } from './_action';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@mui/material';
import { variantColumns } from '@/components/columns/variant-columns';

const page = async ({ searchParams }: { searchParams: { [key: string]: number } }) => {
    const page = searchParams.page;
    const data = await getVariants(page ?? 1);
    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-lg'>Variants</h1>
                <Link href='/variants/create'>
                    <Button className='uppercase !px-4 !py-2' variant="contained">Create</Button>
                </Link>
            </div>
            <div className='p-4 bg-white rounded'>
                <DataTable
                    columns={variantColumns}
                    data={data.items}
                    meta={data.meta}
                    filterColumn='color'
                />
            </div>
        </>
    )
}

export default page