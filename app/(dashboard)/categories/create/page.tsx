"use client"

import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useServerFormState from '@/hooks/useServerFormState';
import { createCategory } from '../_action';

const page = () => {
    let [state, formAction] = useServerFormState(createCategory, null);

    return (
        <div className='p-4 bg-white rounded'>
            <form action={formAction}>
                <TextField name='name' className='w-full mb-4 p-0 ' id="name" label="Name" variant="outlined" />
                <Button type='submit' className="w-full mt-2" variant="contained" >Confirm</Button>
            </form>
        </div>
    )
}

export default page