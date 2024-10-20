"use server"

import { paginate_items_limit } from "@/constants";
import Api from "@/lib/api";
import { notFound } from "next/navigation";

export const getUsers = async (page: number) => {
    const result = await Api.fetch({
        uri: `/admin/users?limit=${paginate_items_limit}&page=${page}`,
        method: "GET",
    });
    return result.data;
}

export const getUser = async (userId: number) => {
    const result = await Api.fetch({
        uri: `/admin/users/${userId}`,
        method: "GET",
    });
    if(result.success === false) {
        return notFound();
    }
    return result.data;
}

export const updateUser = async (previousState: any, formData: FormData) => {
    const userId = formData.get('userId');
    const result = await Api.fetch({
        uri: `/admin/users/${userId}`,
        method: "PUT",
        payload: formData,
    });
    return result;
}

export const createUser = async (previousState: any, formData: FormData) => {
    const result = await Api.fetch({
        uri: `/admin/users`,
        method: "POST",
        payload: formData,
    });
    return result;
}

export const deleteUser = async (previousState: any, userId: number) => {
    const result = await Api.fetch({
        uri: `/admin/users/${userId}`,
        method: "DELETE",
    });
    return result;
}