"use server"

import Api from "@/lib/api";

export const getProducts = async () => {
    const result = await Api.fetch({
        uri: `/admin/products`,
        method: "GET",
    });
    return result.data;
}

export const getCategories = async () => {
    const result = await Api.fetch({
        uri: `/admin/categories`,
        method: "GET",
    });
    return result.data;
}

export const getVariants = async () => {
    const result = await Api.fetch({
        uri: `/admin/variants`,
        method: "GET",
    });
    return result.data;
}

export const getOrders = async () => {
    const result = await Api.fetch({
        uri: `/admin/orders?limit=${5}`,
        method: "GET",
    });
    return result.data;
}

export const getUsers = async () => {
    const result = await Api.fetch({
        uri: `/admin/users?limit=${5}`,
        method: "GET",
    });
    return result.data;
}

export const getAdmins = async () => {
    const result = await Api.fetch({
        uri: `/admins`,
        method: "GET",
    });
    return result.data;
}