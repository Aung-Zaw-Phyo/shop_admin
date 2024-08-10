"use client"

import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import useServerFormState from '@/hooks/useServerFormState';
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from '@/components/atoms/ErrorMessage';
import { objectToFormData } from '@/lib/utils';
import { Product } from '@/components/columns/product-columns';
import { createVariant } from '@/app/(dashboard)/variants/_action';

const schema = z.object({
    color: z
        .string()
        .min(1, { message: "Color is required" }),
    size: z
        .string()
        .min(1, { message: "Size is required" }),
    stock: z
        .string()
        .transform((val) => +val)
        .refine((val) => +val >= 1, {
            message: "Please enter a valid stock",
        }),
    productId: z
        .number({ message: 'Please select product.' }),
});

type IFormInput = z.infer<typeof schema>;

const CreateForm = ({ products }: { products: Product[] }) => {
    let [state, formAction] = useServerFormState(createVariant, null);
    const { register, handleSubmit, formState: { errors }, reset, } = useForm<IFormInput>({ resolver: zodResolver(schema) })
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    const submit = async (formInputs: IFormInput) => {
        const formData = objectToFormData(formInputs);
        formAction(formData);
    };

    useEffect(() => {
        if (state && state.success) {
            setSelectedProductId(null);
            reset();
        }
    }, [state]);

    return (
        <form onSubmit={handleSubmit(submit)} >
            <div className='mb-4'>
                <TextField
                    className='w-full'
                    id='color'
                    label="Color"
                    variant="outlined"
                    {...register('color')}
                />
                {errors.color && <ErrorMessage message={errors.color.message!} />}
            </div>
            <div className='mb-4'>
                <TextField
                    className='w-full'
                    id='size'
                    label="Size"
                    variant="outlined"
                    {...register('size')}
                />
                {errors.size && <ErrorMessage message={errors.size.message!} />}
            </div>
            <div className='mb-4'>
                <TextField
                    type='number'
                    className='w-full'
                    id="stock"
                    label="Stock"
                    variant="outlined"
                    {...register('stock')}
                />
                {errors.stock && <ErrorMessage message={errors.stock.message!} />}
            </div>
            <FormControl fullWidth className='!mb-4'>
                <InputLabel id="productId">Products</InputLabel>
                <Select
                    labelId="productId"
                    id='productId'
                    {...register('productId')}
                    label="Products"
                    value={selectedProductId}
                    input={<OutlinedInput label="Products" />}
                    renderValue={(selectedId) => {
                        const product = products.find(element => element.id == selectedId)
                        return <span key={product?.id}>{product?.name}</span>;
                    }}
                    onChange={(e) => {
                        setSelectedProductId(e.target.value as number);
                    }}
                >
                    {
                        products.map(product => (
                            <MenuItem key={product.id} value={product.id}>
                                <Checkbox checked={selectedProductId == product.id} />
                                <ListItemText primary={product.name} />
                            </MenuItem>
                        ))
                    }

                </Select>
                {errors.productId && <ErrorMessage message={errors.productId.message!} />}
            </FormControl>
            <Button type='submit' className="!mt-4 !py-2" variant="contained">Create</Button>
        </form >
    )
}

export default CreateForm