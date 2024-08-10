import React from 'react'
import { Button } from '@mui/material';
import Link from 'next/link';
import EditForm from '@/components/templates/variants/EditForm';
import { getVariant } from '../../_action';
import { getProducts } from '@/app/(dashboard)/products/_action';

const page = async ({ params }: { params: { variantId: number } }) => {
    const variant = await getVariant(params.variantId);
    const products = await getProducts(1, 0);
    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-lg'>Edit Category</h1>
                <Link href='/variants'>
                    <Button className='uppercase !px-4 !py-2' variant="contained">Back</Button>
                </Link>
            </div>
            <div className='p-4 bg-white rounded'>
                <EditForm variant={variant} products={products.items} />
            </div>
        </>
    )
}

export default page