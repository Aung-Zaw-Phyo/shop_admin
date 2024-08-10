import React from 'react'
import Button from '@mui/material/Button';
import Link from 'next/link';
import CreateForm from '@/components/templates/variants/CreateForm';
import { getProducts } from '../../products/_action';

const page = async () => {
    const products = await getProducts(1, 0);
    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-lg'>Create Variant</h1>
                <Link href='/variants'>
                    <Button className='uppercase !px-4 !py-2' variant="contained">Back</Button>
                </Link>
            </div>
            <div className='p-4 bg-white rounded'>
                <CreateForm products={products.items} />
            </div>
        </>
    )
}

export default page