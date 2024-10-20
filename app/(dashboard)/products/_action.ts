"use server"

import { paginate_items_limit } from "@/constants";
import Api from "@/lib/api";
import { notFound } from "next/navigation";

export const getProducts = async (page: number, limit: number = paginate_items_limit) => {
    const result = await Api.fetch({
        uri: `/admin/products?limit=${limit}&page=${page}`,
        method: "GET",
    });
    return result.data;
}

export const getProduct = async (userId: number) => {
    const result = await Api.fetch({
        uri: `/admin/products/${userId}`,
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
        uri: `/admin/products/${productId}`,
        method: "PUT",
        payload: formData,
    });
    return result;
}

export const createProduct = async (previousState: any, formData: FormData) => {
    const result = await Api.fetch({
        uri: `/admin/products`,
        method: "POST",
        payload: formData,
    });
    return result;
}

export const deleteProduct = async (previousState: any, productId: number) => {
    const result = await Api.fetch({
        uri: `/admin/products/${productId}`,
        method: "DELETE",
    });
    return result;
}