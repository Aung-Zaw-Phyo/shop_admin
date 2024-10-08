import React from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';
import { getProduct } from '../_action';
import { Image } from '@/components/columns/product-columns';
import { Category } from '@/components/columns/category-columns';
import { Variant } from '@/components/columns/variant-columns';

const page = async ({ params }: { params: { productId: number } }) => {
    const product = await getProduct(params.productId);

    const variantsTable = (<TableContainer component={Paper} className='w-[100%] sm:!w-[60%] lg:!w-[40%]'>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell className='font-semibold'>Color</TableCell>
                    <TableCell className='font-semibold' align="right">Size</TableCell>
                    <TableCell className='font-semibold' align="right">Stock</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    product.variants.map((variant: Variant) => {
                        return (
                            <TableRow
                                key={variant.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{variant.color}</TableCell>
                                <TableCell align="right">{variant.size}</TableCell>
                                <TableCell align="right">{variant.stock}</TableCell>
                            </TableRow>
                        );
                    })
                }
            </TableBody>
        </Table>
    </TableContainer>);

    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-lg'>{product.name}</h1>
                <div className='flex gap-2'>
                    <Link href={`/products/${product.id}/edit`}>
                        <Button className='uppercase !px-4 !py-2' variant="contained">Edit</Button>
                    </Link>
                    <Link href='/products'>
                        <Button className='uppercase !px-4 !py-2' variant="contained">Back</Button>
                    </Link>
                </div>
            </div >
            <div className='p-4 bg-white rounded'>
                <div className='flex flex-wrap gap-4 mb-4'>
                    {
                        product.images.map((image: Image) => {
                            return (
                                <div className='border-2 p-3 flex justify-center items-center rounded-md'>
                                    <img src={image.name} width={110} className="rounded" alt="Product Image" />
                                </div>
                            );
                        })
                    }
                </div>
                <div className='mb-2'>
                    Price: <span className='font-medium'>${product.price}</span>
                </div>
                <div className='mb-2'>
                    Categories: {
                        product.categories.map((category: Category, index: number) => {
                            return (
                                <span className='font-medium italic'>
                                    {category.name}
                                    {index != product.categories.length - 1 ? ' , ' : ''}
                                </span>
                            );
                        })
                    }
                </div>
                <div className='mb-4'>
                    <div className='mb-1'>Description :</div>
                    <p className=''>{product.description}</p>
                </div>
                <div>
                    <div className='mb-1'>Variants :</div>
                    {product.variants.length > 0 ? variantsTable : <span className='py-2 text-gray-600'>There is no variant.</span>}

                </div>
            </div>
        </>
    )
}

export default page