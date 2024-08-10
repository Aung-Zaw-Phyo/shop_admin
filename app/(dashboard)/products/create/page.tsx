import React from 'react'
import Button from '@mui/material/Button';
import Link from 'next/link';
import CreateForm from '@/components/templates/products/CreateForm';
import { getCategories } from '../../categories/_action';

const page = async () => {
    const categories = await getCategories(1, 0); // limit 0 is all
    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-lg'>Create Product</h1>
                <Link href='/products'>
                    <Button className='uppercase !px-4 !py-2' variant="contained">Back</Button>
                </Link>
            </div>
            <div className='p-4 bg-white rounded'>
                <CreateForm categories={categories.items} />
            </div>
        </>
    )
}

export default page