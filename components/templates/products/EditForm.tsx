"use client"

import React, { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import useServerFormState from '@/hooks/useServerFormState';
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from '@/components/atoms/ErrorMessage';
import { objectToFormData } from '@/lib/utils';
import { CloudUploadIcon, Image } from 'lucide-react';
import { Category } from '@/components/columns/category-columns';
import { updateProduct } from '@/app/(dashboard)/products/_action';
import { Product } from '@/components/columns/product-columns';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

const schema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required." }),
    description: z
        .string()
        .min(1, { message: "Please enter description." }),
    price: z
        .any()
        .transform((val) => +val)
        .refine((val) => +val >= 100, {
            message: "Please enter a valid price",
        }),
    categories: z
        .number({ message: "Please select categories." })
        .array()
        .nonempty({ message: "Please select categories." }),
    images: z
        .any()
        .optional()
        .refine((files) => {
            return !files?.[0] ? true : files?.[0].size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine(
            (files) => !files?.[0] ? true : ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
});

export type IFormInput = z.infer<typeof schema>;

const EditForm = ({ product, categories }: { product: Product, categories: Category[] }) => {
    let [state, formAction] = useServerFormState(updateProduct, null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: product.name,
            description: product.description,
            price: product.price,
            categories: product.categories.map(category => category.id),
            images: []
        },
    })
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const submit = async (formInputs: IFormInput) => {
        const formData = objectToFormData(formInputs);
        formData.append('productId', product.id.toString());
        formAction(formData);
    };

    const handleChange = (event: SelectChangeEvent<typeof selectedCategories>) => {
        const value = event.target.value;
        setSelectedCategories(typeof value === 'string' ? value.split(',').map(Number) : value);
    };

    useEffect(() => {
        if (state && state.success) {
            reset();
        }
        if (!state) {
            setSelectedCategories(product.categories.map(category => category.id));
        }
    }, [state]);

    return (
        <form onSubmit={handleSubmit(submit)} encType="multipart/form-data">
            <div className='mb-4'>
                <TextField
                    className='w-full'
                    id="name"
                    label="Name"
                    variant="outlined"
                    {...register('name')}
                />
                {errors.name && <ErrorMessage message={errors.name.message!} />}
            </div>
            <div className='mb-4'>
                <TextField
                    className='w-full'
                    multiline
                    rows={3}
                    id="description"
                    label="Description"
                    variant="outlined"
                    {...register('description')}
                />
                {errors.description && <ErrorMessage message={errors.description.message!} />}
            </div>
            <div className='mb-4'>
                <TextField
                    type='number'
                    className='w-full'
                    id="price"
                    label="Price (MMK)"
                    variant="outlined"
                    {...register('price')}
                />
                {errors.price && <ErrorMessage message={errors.price.message!} />}
            </div>
            <FormControl fullWidth className='!mb-4'>
                <InputLabel id="categories">Categories</InputLabel>
                <Select
                    labelId="categories"
                    id="categories"
                    multiple
                    {...register('categories')}
                    label="Categories"
                    value={selectedCategories as []}
                    input={<OutlinedInput label="Categories" />}
                    renderValue={(selected) => (
                        selected.map((id) => {
                            const cat = categories.find(element => element.id == id)
                            return <span key={cat?.id}>{cat?.name}, </span>;
                        })
                    )}
                    onChange={handleChange}
                >
                    {
                        categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                <Checkbox checked={selectedCategories.indexOf(category.id) > -1} />
                                <ListItemText primary={category.name} />
                            </MenuItem>
                        ))
                    }

                </Select>
                {errors.categories && <ErrorMessage message={errors.categories.message!} />}
            </FormControl>
            <div className='mb-4'>
                <label htmlFor="images" className='cursor-pointer inline-block'>
                    {product.images.length > 0 && !selectedImages.length &&
                        <div className='flex flex-wrap gap-4 p-3 border-2 border-dotted shadow-sm rounded'>
                            {
                                product.images.map((image) => <img
                                    key={image.id}
                                    src={image.name}
                                    className="rounded h-[130px]"
                                    alt=""
                                />)
                            }
                        </div>
                    }
                    {
                        selectedImages.length > 0 &&
                        <div className='flex gap-3 p-3 border-2 border-dotted shadow-sm rounded'>
                            {
                                selectedImages.map((image) => <img
                                    key={image.name}
                                    src={URL.createObjectURL(image)}
                                    className="rounded h-[130px]"
                                    alt=""
                                />)
                            }
                        </div>
                    }
                    {
                        !product.images.length && !selectedImages.length &&
                        <div className='w-[130px] h-[130px] border-2 border-dotted rounded p-1 flex flex-col justify-center items-center'>
                            <CloudUploadIcon size={110} className='text-[#1565C0]' />
                            <span className='font-medium'>Upload Image</span>
                        </div>
                    }
                </label>
                <input
                    type="file"
                    accept="image/*"
                    {...register('images')}
                    id='images'
                    hidden
                    multiple
                    onChangeCapture={(e) => {
                        if (e.currentTarget.files) {
                            setSelectedImages(Array.from(e.currentTarget.files));
                        } else {
                            setSelectedImages([]);
                        }
                    }}
                />
                {errors.images && <ErrorMessage message={errors.images.message! as string} />}
            </div>
            <Button type='submit' className=" !py-2" variant="contained">Update</Button>
        </form >
    )
}

export default EditForm
