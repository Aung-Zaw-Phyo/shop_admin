"use server"

import { paginate_items_limit } from "@/constants";
import Api from "@/lib/api";
import { getToken } from "@/lib/helper";
import { notFound } from "next/navigation";

export const getCategories = async (page: number, limit: number = paginate_items_limit) => {
    const result = await Api.fetch({
        uri: `/admin/categories?limit=${limit}&page=${page}`,
        method: "GET",
    });
    return result.data;
}

export const getCategory = async (categoryId: number) => {
    const result = await Api.fetch({
        uri: `/admin/categories/${categoryId}`,
        method: "GET",
    });
    if(result.success === false) {
        return notFound();
    }
    return result.data;
}

export const updateCategory = async (previousState: any, formData: FormData) => {
    const categoryId = formData.get('categoryId');
    const payload = {
        name: formData.get('name'),
    }
    const result = await Api.fetch({
        uri: `/admin/categories/${categoryId}`,
        method: "PUT",
        headers: {
            Authorization: "Bearer " + getToken(),
        },
        payload: payload,
    });
    return result;
}

export const createCategory = async (previousState: any, formData: FormData) => {
    const payload = {
        name: formData.get('name'),
    }
    const result = await Api.fetch({
        uri: `/admin/categories`,
        method: "POST",
        headers: {
            Authorization: "Bearer " + getToken(),
        },
        payload: payload,
    });
    return result;
}

export const deleteCategory = async (previousState: any, categoryId: number) => {
    const result = await Api.fetch({
        uri: `/admin/categories/${categoryId}`,
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + getToken(),
        },
    });
    return result;
}