import React from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';
import { getOrder } from '../_action';
import { OrderDetails } from '@/components/columns/order-columns';

const page = async ({ params }: { params: { orderId: number } }) => {
    const order: OrderDetails = await getOrder(params.orderId);
    const date = new Date(order.createdAt);
    const formattedDateTime = date.toLocaleString();
    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-lg'>Order Details <span className='font-light'>(#{order.orderNumber} | <span className='uppercase'>{order.status}</span>)</span></h1>
                <div className='flex gap-2'>
                    <Link href='/orders'>
                        <Button className='uppercase !px-4 !py-2' variant="contained">Back</Button>
                    </Link>
                </div>
            </div >
            <div className='relative p-4 py-6 bg-white rounded grid md:grid-cols-2 gap-6'>
                <div className='absolute top-0 right-0 p-1 text-sm font-light'>{formattedDateTime}</div>
                <div className='mb-6'>
                    <div className='mb-4 text-lg font-medium'>Items</div>
                    <div className="flex flex-wrap gap-3 mb-5">
                        {
                            order.items.map((item) => (
                                <div key={item.id} className='flex'>
                                    <div className='border-2 p-3 flex flex-col justify-between rounded-md'>
                                        <img src={item.images[0].name} width={150} className="rounded mx-auto mb-4" alt={item.name} />
                                        <div>
                                            <div className=''>{item.name}</div>
                                            <div className='flex justify-between items-center font-light text-xs lg:text-sm mb-2'>
                                                <span>Color: {item.color}</span>
                                                <span>Size: {item.size}</span>
                                            </div>
                                            <div className='flex justify-between items-center text-sm'>
                                                <span>${item.price} x {item.quantity}</span>
                                                <span className='font-medium text-lg'>${item.price * item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <div className='text-lg'><span>Total Amount: </span> <span className='text-xl font-semibold'>${order.totalAmount}</span></div>
                    </div>
                </div>
                <div className='md:p-2 lg:px-6 md:border-l-2 md:border-dashed'>
                    <div>
                        <div className='mb-4 text-lg font-medium'>User Information</div>
                        <div>
                            <div className='flex justify-center mb-2'>
                                <img src={order.user.image} width={110} height={110} className="rounded-full mb-3" alt={order.user.name} />
                            </div>
                            <div className='flex justify-between mb-3'>
                                <div>Name</div>
                                <div>{order.user.name}</div>
                            </div>
                            <div className='flex justify-between mb-3'>
                                <div>Email</div>
                                <div>{order.user.email}</div>
                            </div>
                        </div>
                    </div>
                    <div className='border border-[#33333311] my-6'></div>
                    <div>
                        <div className='mb-4 text-lg font-medium'>Shipping Address</div>
                        <div>
                            <div className='flex justify-between mb-3'>
                                <div>Name</div>
                                <div>{order.shippingAddress.name}</div>
                            </div>
                            <div className='flex justify-between mb-3'>
                                <div>Phone</div>
                                <div>{order.shippingAddress.phone}</div>
                            </div>
                            <div className='flex justify-between mb-3'>
                                <div>Country</div>
                                <div>{order.shippingAddress.country}</div>
                            </div>
                            <div className='flex justify-between mb-3'>
                                <div>City</div>
                                <div>{order.shippingAddress.city}</div>
                            </div>
                            <div className='flex justify-between mb-3'>
                                <div>Address</div>
                                <div>{order.shippingAddress.line1}</div>
                            </div>
                            <div className='flex justify-between mb-3'>
                                <div>Address</div>
                                <div>{order.shippingAddress.line2}</div>
                            </div>
                            <div className='flex justify-between mb-3'>
                                <div>State</div>
                                <div>{order.shippingAddress.state}</div>
                            </div>
                            <div className='flex justify-between mb-3'>
                                <div>Postal Code</div>
                                <div>{order.shippingAddress.postal_code}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page