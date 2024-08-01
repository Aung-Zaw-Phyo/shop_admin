"use client"

import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { login } from '@/app/(auth)/login/_action';
import useServerFormState from '@/hooks/useServerFormState';
import { useFormState, useFormStatus } from 'react-dom';


  
const LoginForm = () => {
    let [num, setNum] = useState<number>(0);
    let [state, formAction] = useFormState(login, null);
    let {pending} = useFormStatus();

    
    useEffect(() => {
        console.log('**********************',num); 
    }, [num]);

    const handleChange = () => {
        setNum(prevNum => prevNum + 1);
    };

    return (
        <form action={formAction}>
            {num}
            <TextField onChange={handleChange} name='email' className='w-full mb-4 p-0' id="email" label="Email" variant="outlined" />
            <TextField name='password' type="password" className='w-full mb-4' id="password" label="Password" variant="outlined" />
            <Button type='submit' className="w-full mt-2" variant="contained" >{pending ? 'Loading ...' : 'Confirm'}</Button>
        </form>
    )
}

export default LoginForm