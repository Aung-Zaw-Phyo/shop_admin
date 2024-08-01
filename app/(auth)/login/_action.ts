"use server"

import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

const base_url = process.env.NEXT_PUBLIC_BACKOFFICE_API;

export async function login(previousState: any, formData: FormData) {
  try {
    const payload = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    const response = await fetch(base_url + '/admins/login', {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if(result.success === true) {
      cookies().set({
        name: "token",
        value: result.data.access_token,
      });
    }

    return result;
  } catch (error) {
    console.log('Server Failed - ', error);
  }
    
}
