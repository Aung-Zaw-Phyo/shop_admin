import React from 'react'
import { Button } from '@mui/material';
import Link from 'next/link';
import EditForm from '@/components/templates/products/EditForm';
import { getProduct } from '../../_action';
import { getCategories } from '@/app/(dashboard)/categories/_action';

const page = async ({ params }: { params: { productId: number } }) => {
    const product = await getProduct(params.productId);
    const categories = await getCategories(1, 0); // limit 0 is all

    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-lg'>Edit Product</h1>
                <Link href='/products'>
                    <Button className='uppercase !px-4 !py-2' variant="contained">Back</Button>
                </Link>
            </div>
            <div className='p-4 bg-white rounded'>
                <EditForm product={product} categories={categories.items} />
            </div>
        </>
    )
}

export default page