import React from 'react'
import { getCategory } from '../../_action'
import { Button } from '@mui/material';
import Link from 'next/link';
import EditForm from '@/components/templates/categories/EditForm';

const page = async ({ params }: { params: { categoryId: number } }) => {
    const data = await getCategory(params.categoryId);
    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-lg'>Edit Category</h1>
                <Link href='/categories'>
                    <Button className='uppercase !px-4 !py-2' variant="contained">Back</Button>
                </Link>
            </div>
            <div className='p-4 bg-white rounded'>
                <EditForm category={data} />
            </div>
        </>
    )
}

export default page