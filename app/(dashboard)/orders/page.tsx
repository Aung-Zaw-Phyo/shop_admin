import Link from 'next/link'
import React from 'react'
import { DataTable } from '@/components/ui/data-table';
import { orderColumns } from '@/components/columns/order-columns';
import { getOrders } from './_action';

const page = async ({ searchParams }: { searchParams: { [key: string]: number } }) => {
    const page = searchParams.page;
    const data = await getOrders(page ?? 1);
    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-lg'>Orders</h1>
            </div>
            <div className='p-4 bg-white rounded'>
                <DataTable
                    columns={orderColumns}
                    data={data.items}
                    meta={data.meta}
                    filterColumn='orderNumber'
                />
            </div>
        </>
    )
}

export default page