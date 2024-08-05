"use client"

import React, { useActionState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import useServerFormState from '@/hooks/useServerFormState';
import { Button } from '@mui/material';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from '@/components/atoms/ErrorMessage';
import { objectToFormData } from '@/lib/utils';
import { Category } from '../../columns/category-columns';
import { updateCategory } from '@/app/(dashboard)/categories/_action';

const schema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" }),
});

type IFormInput = z.infer<typeof schema>;

const EditForm = ({ category }: { category: Category }) => {
    let [state, formAction] = useServerFormState(updateCategory, null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({ resolver: zodResolver(schema) })

    const submit = async (formInputs: IFormInput) => {
        const formData = objectToFormData(formInputs);
        formData.append('categoryId', category.id);
        formAction(formData);
    };

    return (
        <form onSubmit={handleSubmit(submit)} >
            <TextField
                className='w-full'
                id="name"
                label="Name"
                variant="outlined"
                {...register('name')}
                defaultValue={category.name}
            />
            {errors.name && <ErrorMessage message={errors.name.message!} />}
            <Button type='submit' className="!mt-4 !py-2" variant="contained">Update</Button>
        </form >
    )
}

export default EditForm