"use client"

import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { login } from '@/app/(auth)/_action';
import useServerFormState from '@/hooks/useServerFormState';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { objectToFormData } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/components/atoms/ErrorMessage';

const schema = z.object({
    email: z
        .string()
        .min(1, { message: "Please enter valid email" })
        .email(),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
});

type IFormInput = z.infer<typeof schema>;

const LoginForm = () => {
    let [state, formAction] = useServerFormState(login, null);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({ resolver: zodResolver(schema) })

    const submit = async (formInputs: IFormInput) => {
        const formData = objectToFormData(formInputs);
        formAction(formData);
    };

    useEffect(() => {
        if (state) {
            router.push('/');
        }
    }, [state])
    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className='mb-4'>
                <TextField
                    className='w-full'
                    id="email"
                    label="Email"
                    variant="outlined"
                    {...register('email')}
                />
                {errors.email && <ErrorMessage message={errors.email.message!} />}
            </div>
            <div className='mb-4'>
                <TextField
                    type='password'
                    className='w-full'
                    id="password"
                    label="Password"
                    variant="outlined"
                    {...register('password')}
                />
                {errors.password && <ErrorMessage message={errors.password.message!} />}
            </div>
            <Button type='submit' className="!py-2" variant="contained">Confirm</Button>
        </form>
    )
}

export default LoginForm