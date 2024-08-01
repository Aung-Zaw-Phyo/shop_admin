"use client"

import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { login } from '@/app/(auth)/login/_action';
import useServerFormState from '@/hooks/useServerFormState';
import { useRouter } from 'next/navigation';
  
const LoginForm = () => {
    let [state, formAction] = useServerFormState(login, null);
    const router = useRouter();
    useEffect(() => {
        if(state) {
            router.push('/');
        }
    }, [state])
    return (
        <form action={formAction}>
            <TextField name='email' className='w-full mb-4 p-0 ' id="email" label="Email" variant="outlined" />
            <TextField name='password' type="password" className='w-full mb-4' id="password" label="Password" variant="outlined" />
            <Button type='submit' className="w-full mt-2" variant="contained" >Confirm</Button>
        </form>
    )
}

export default LoginForm