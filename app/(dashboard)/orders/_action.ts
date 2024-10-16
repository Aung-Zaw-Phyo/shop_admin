"use server"

import { paginate_items_limit } from "@/constants";
import Api from "@/lib/api";
import { notFound } from "next/navigation";

export const getOrders = async (page: number, limit: number = paginate_items_limit) => {
    const result = await Api.fetch({
        uri: `/admin/orders?limit=${limit}&page=${page}`,
        method: "GET",
    });
    return result.data;
}

export const getOrder = async (userId: number) => {
    const result = await Api.fetch({
        uri: `/admin/orders/${userId}`,
        method: "GET",
    });
    if(result.success === false) {
        return notFound();
    }
    return result.data;
}

export const updateOrder = async (previousState: any, orderId: number) => {
    const result = await Api.fetch({
        uri: `/admin/orders/${orderId}`,
        method: "PUT",
    });
    return result;
}