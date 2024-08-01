"use client"

import * as React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PageList from './PageList';

export default function Drawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div className='md:hidden'>
      <Button onClick={toggleDrawer(true)}><MenuOutlinedIcon/></Button>
      <MuiDrawer open={open} onClose={toggleDrawer(false)}>
            <PageList onToggle={toggleDrawer}/>
      </MuiDrawer>
    </div>
  );
}
