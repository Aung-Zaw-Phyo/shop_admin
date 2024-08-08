"use server"

import Api from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(previousState: any, formData: FormData) {
    const payload = {
        email: formData.get('email'),
        password: formData.get('password'), 
    }
    const result = await Api.fetch({
        uri: `/admins/login`,
        method: "POST",
        payload: payload,
    });
    if(result.success === true) {
        cookies().set({
            name: "token",
            value: result.data.access_token,
        });
        cookies().set({
            name: "user",
            value: JSON.stringify({
                name: result.data.name,
                email: result.data.email,
                image: result.data.image,
            }),
        });
    }
    return result;
}

export async function logout() {
    cookies().delete({
        name: "token",
    });
    cookies().delete({
        name: "user",
    });
    redirect('/login');
}


