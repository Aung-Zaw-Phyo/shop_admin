"use server"

import { paginate_items_limit } from "@/constants";
import Api from "@/lib/api";
import { getToken } from "@/lib/helper";
import { notFound } from "next/navigation";

export const getVariants = async (page: number) => {
    const result = await Api.fetch({
        uri: `/admin/variants?limit=${paginate_items_limit}&page=${page}`,
        method: "GET",
    });
    return result.data;
}

export const getVariant = async (variantId: number) => {
    const result = await Api.fetch({
        uri: `/admin/variants/${variantId}`,
        method: "GET",
    });
    if(result.success === false) {
        return notFound();
    }
    return result.data;
}

export const updateVariant = async (previousState: any, formData: FormData) => {
    const variantId = formData.get('variantId');
    const payload = {
        color: formData.get('color'),
        size: formData.get('size'),
        stock: formData.get('stock'),
        productId: formData.get('productId'),
    }
    const result = await Api.fetch({
        uri: `/admin/variants/${variantId}`,
        method: "PUT",
        payload: payload,
    });
    return result;
}

export const createVariant = async (previousState: any, formData: FormData) => {
    const payload = {
        color: formData.get('color'),
        size: formData.get('size'),
        stock: formData.get('stock'),
        productId: formData.get('productId'),
    }
    const result = await Api.fetch({
        uri: `/admin/variants`,
        method: "POST",
        payload: payload,
    });
    return result;
}

export const deleteVariant = async (previousState: any, categoryId: number) => {
    const result = await Api.fetch({
        uri: `/admin/variants/${categoryId}`,
        method: "DELETE",
    });
    return result;
}