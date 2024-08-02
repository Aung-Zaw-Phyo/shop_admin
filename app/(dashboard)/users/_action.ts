import { User } from "./columns";

export async function getUsers(): Promise<User[]> {
    const response = await fetch(
        'https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users', 
        {
            method: "GET",
            cache: "no-store",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();
    return data;
}