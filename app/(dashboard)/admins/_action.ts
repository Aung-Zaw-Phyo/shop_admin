"use server"

import { paginate_items_limit } from "@/constants";
import Api from "@/lib/api";
import { notFound } from "next/navigation";

export const getAdmins = async (page: number) => {
    const result = await Api.fetch({
        uri: `/admins?limit=${paginate_items_limit}&page=${page}`,
        method: "GET",
    });
    return result.data;
}

export const getAdmin = async (adminId: number) => {
    const result = await Api.fetch({
        uri: `/admins/${adminId}`,
        method: "GET",
    });
    if(result.success === false) {
        return notFound();
    }
    return result.data;
}

export const updateAdmin = async (previousState: any, formData: FormData) => {
    const adminId = formData.get('adminId');
    const result = await Api.fetch({
        uri: `/admins/${adminId}`,
        method: "PUT",
        payload: formData,
    });
    return result;
}

export const createAdmin = async (previousState: any, formData: FormData) => {
    const result = await Api.fetch({
        uri: `/admins`,
        method: "POST",
        payload: formData,
    });
    return result;
}

export const deleteAdmin = async (previousState: any, adminId: number) => {
    const result = await Api.fetch({
        uri: `/admins/${adminId}`,
        method: "DELETE",
    });
    return result;
}