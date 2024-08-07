"use client"

import React, { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import useServerFormState from '@/hooks/useServerFormState';
import { Button } from '@mui/material';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from '@/components/atoms/ErrorMessage';
import { generateBase64FromImage, objectToFormData } from '@/lib/utils';
import { CloudUploadIcon, Image } from 'lucide-react';
import { User } from '@/components/columns/user-columns';
import { updateUser } from '@/app/(dashboard)/users/_action';

const schema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" }),
    email: z
        .string()
        .email()
        .min(1, { message: "Please enter valid email" }),
    password: z.string().nullish(),

});

type IFormInput = z.infer<typeof schema>;

const CreateForm = ({ user }: { user: User }) => {
    let [state, formAction] = useServerFormState(updateUser, null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({ resolver: zodResolver(schema) })
    const [imagePreview, setImagePreview] = useState<any>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageFiles = e.target.files;
        if (imageFiles && imageFiles[0]) {
            generateBase64FromImage(imageFiles[0])
                .then(b64 => {
                    setImagePreview(b64);
                })
                .catch(() => {
                    setImagePreview(null);
                });
        } else {
            setImagePreview(null);
        }
    };

    const submit = async (formInputs: IFormInput) => {
        const formData = objectToFormData(formInputs);
        if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
            formData.append('image', fileInputRef.current.files[0]);
        }
        formData.append('userId', user.id);
        formAction(formData);
    };

    return (
        <form onSubmit={handleSubmit(submit)} encType="multipart/form-data">
            <div className='mb-4'>
                <TextField
                    className='w-full'
                    id="name"
                    label="Name"
                    variant="outlined"
                    {...register('name')}
                    defaultValue={user.name}
                />
                {errors.name && <ErrorMessage message={errors.name.message!} />}
            </div>
            <div className='mb-4'>
                <TextField
                    className='w-full'
                    id="email"
                    label="Email"
                    variant="outlined"
                    {...register('email')}
                    defaultValue={user.email}
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
            <div className='mb-4'>
                <label htmlFor="image" className='cursor-pointer inline-block'>
                    {
                        imagePreview && <img
                            src={imagePreview}
                            className=" rounded w-[130px] h-[130px]"
                            alt=""
                        />
                    }
                    {
                        !imagePreview && user.image && <img
                            src={user.image}
                            className=" rounded w-[130px] h-[130px]"
                            alt=""
                        />
                    }
                    {
                        !imagePreview && !user.image && <div className='w-[130px] h-[130px] border-2 border-dotted rounded p-1 flex flex-col justify-center items-center'>
                            <CloudUploadIcon size={110} className='text-[#1565C0]' />
                            <span className='font-medium'>Upload Image</span>
                        </div>
                    }
                </label>
                <input
                    type="file"
                    id='image'
                    // {...register('image')}
                    hidden
                    ref={fileInputRef}
                    onChange={fileChangeHandler}
                />
            </div>
            <Button type='submit' className=" !py-2" variant="contained">Update</Button>
        </form >
    )
}

export default CreateForm