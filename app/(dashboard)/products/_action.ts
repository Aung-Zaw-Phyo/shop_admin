"use server"

import { IFormInput } from "@/components/templates/products/CreateForm";
import { paginate_items_limit } from "@/constants";
import Api from "@/lib/api";
import { notFound } from "next/navigation";

export const getProducts = async (page: number) => {
    const result = await Api.fetch({
        uri: `/products?limit=${paginate_items_limit}&page=${page}`,
        method: "GET",
    });
    return result.data;
}

export const getProduct = async (userId: number) => {
    const result = await Api.fetch({
        uri: `/products/${userId}`,
        method: "GET",
    });
    if(result.success === false) {
        return notFound();
    }
    return result.data;
}

export const updateProduct = async (previousState: any, formData: FormData) => {
    const productId = formData.get('productId');
    const result = await Api.fetch({
        uri: `/products/${productId}`,
        method: "PUT",
        payload: formData,
    });
    return result;
}

export const createProduct = async (previousState: any, formData: FormData) => {
    const result = await Api.fetch({
        uri: `/products`,
        method: "POST",
        payload: formData,
    });
    return result;
}

export const deleteProduct = async (previousState: any, productId: number) => {
    const result = await Api.fetch({
        uri: `/products/${productId}`,
        method: "DELETE",
    });
    return result;
}