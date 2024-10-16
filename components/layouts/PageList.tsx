"use client"
import React from 'react'
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Dashboard from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import SellIcon from '@mui/icons-material/Sell';
import CategoryIcon from '@mui/icons-material/Category';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SegmentIcon from '@mui/icons-material/Segment';

interface PageListProps {
    onToggle?: (newOpen: boolean) => () => void;
}

const routes = [
    { name: 'Dashboard', uri: '/', icon: <Dashboard className='text-white' /> },
    { name: 'Products', uri: '/products', icon: <FormatListBulletedIcon className='text-white' /> },
    { name: 'Categories', uri: '/categories', icon: <CategoryIcon className='text-white' /> },
    { name: 'Variants', uri: '/variants', icon: <SegmentIcon className='text-white' /> },
    { name: 'Orders', uri: '/orders', icon: <SellIcon className='text-white' /> },
    { name: 'Users', uri: '/users', icon: <GroupIcon className='text-white' /> },
    { name: 'Admins', uri: '/admins', icon: <AdminPanelSettingsIcon className='text-white' /> },
]

const PageList: React.FC<PageListProps> = ({ onToggle = null }) => {
    const handleToggle = (newOpen: boolean) => {
        if (onToggle) {
            onToggle(newOpen)();
        }
    };
    return (
        <Box role="presentation" className='bg-[#233044] text-white w-[260px] md:w-[300px] min-h-[100vh] overflow-y-scroll overflow-x-hidden no-scrollbar'>
            <div className="sticky z-10 top-0 bg-[#233044] text-white shadow-sm py-3 px-4 text-2xl font-bold">
                <h1 className="h-[50px] flex items-center">MY SHOP</h1>
            </div>
            <List>
                {routes.map((route, index) => (
                    <Link href={route.uri} key={route.uri}>
                        <ListItem disablePadding onClick={handleToggle.bind(null, false)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* <MailIcon className='text-white' /> */}
                                    {route.icon}
                                </ListItemIcon>
                                <ListItemText primary={route.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon className='text-white' /> : <MailIcon className='text-white' />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </Box>
    )
}

export default PageList