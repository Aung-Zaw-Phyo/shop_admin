import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import { getAdmins, getCategories, getOrders, getProducts, getUsers, getVariants } from './_action';
import DataCard from '@/components/templates/data-card';
import { User } from '@/components/columns/user-columns';
import { Order } from '@/components/columns/order-columns';
import Link from 'next/link';

type Data = {
    items: [],
    meta: { totalItems: number },
}

export default async function Home() {
    const productsData: Data = await getProducts();
    const categoriesData: Data = await getCategories();
    const variantsData: Data = await getVariants();
    const ordersData: Data = await getOrders();
    const usersData: Data = await getUsers();
    const adminsData: Data = await getAdmins();
    return (
        <main>
            <h1 className="mb-4 text-2xl">Dashboard</h1>
            <div className='p-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4'>
                <DataCard count={productsData.meta.totalItems} title='Products' route='products' />
                <DataCard count={categoriesData.meta.totalItems} title='Categories' route='categories' />
                <DataCard count={variantsData.meta.totalItems} title='Variants' route='variants' />
                <DataCard count={ordersData.meta.totalItems} title='Orders' route='orders' />
                <DataCard count={usersData.meta.totalItems} title='Users' route='users' />
                <DataCard count={adminsData.meta.totalItems} title='Admins' route='admins' />
            </div>
            <div className='p-4 grid grid-cols-2 gap-4'>
                <div>
                    <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                            <Toolbar
                                sx={[
                                    {
                                        pl: { sm: 2 },
                                        pr: { xs: 1, sm: 1 },
                                    },
                                ]}
                            >
                                <h1 className='text-lg'>Users</h1>
                            </Toolbar>
                            <TableContainer >
                                <Table sx={{ minWidth: 250 }} >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell >email</TableCell>
                                            <TableCell align='right'>Profile</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {usersData.items.map((user: User) => (
                                            <TableRow
                                                key={user.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {user.name}
                                                </TableCell>
                                                <TableCell >{user.email}</TableCell>
                                                <TableCell className='flex justify-end'><img src={user.image} width={60} className="rounded-full" alt="User Image" /></TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={3} align='right'>
                                                <Link href={'users'} className='text-blue-600 border-b border-blue-600'>View all users</Link>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Box>
                </div>
                <div>
                    <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                            <Toolbar
                                sx={[
                                    {
                                        pl: { sm: 2 },
                                        pr: { xs: 1, sm: 1 },
                                    },
                                ]}
                            >
                                <h1 className='text-lg'>Latest Orders</h1>
                            </Toolbar>
                            <TableContainer >
                                <Table sx={{ minWidth: 250 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>User Name</TableCell>
                                            <TableCell>Order Number</TableCell>
                                            <TableCell align='right'>Total Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {ordersData.items.map((order: Order) => (
                                            <TableRow
                                                key={order.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {order.user.name}
                                                </TableCell>
                                                <TableCell>{order.orderNumber}</TableCell>
                                                <TableCell align='right'><span className='text-lg'>${order.totalAmount}</span></TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={3} align='right'>
                                                <Link href={'orders'} className='text-blue-600 border-b border-blue-600'>View all orders</Link>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Box>
                </div>
            </div>
        </main >
    );
}
