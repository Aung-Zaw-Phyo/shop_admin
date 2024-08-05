"use client"

import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import useServerFormState from '@/hooks/useServerFormState';
import { createCategory } from '@/app/(dashboard)/categories/_action';
import { Button } from '@mui/material';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from '@/components/atoms/ErrorMessage';
import { objectToFormData } from '@/lib/utils';

const schema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" }),
});

type IFormInput = z.infer<typeof schema>;

const CreateForm = () => {
    let [state, formAction] = useServerFormState(createCategory, null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({ resolver: zodResolver(schema) })

    const submit = async (formInputs: IFormInput) => {
        const formData = objectToFormData(formInputs);
        formAction(formData);
    };

    useEffect(() => {
        if (state && state.success) {
            reset();
        }
    }, [state]);

    return (
        <form onSubmit={handleSubmit(submit)} >
            <TextField
                className='w-full'
                id="name"
                label="Name"
                variant="outlined"
                {...register('name')}
            />
            {errors.name && <ErrorMessage message={errors.name.message!} />}
            <Button type='submit' className="!mt-4 !py-2" variant="contained">Create</Button>
        </form >
    )
}

export default CreateForm