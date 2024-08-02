"use server"

const base_url = process.env.NEXT_PUBLIC_BACKOFFICE_API;

export const getCategories = async () => {
    try {
        const response = await fetch(base_url + '/categories', {
            method: "GET",
            cache: "no-store",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.log('Server Failed - ', error);
    }
}

export const createCategory = async (previousState: any, formData: FormData) => {
    try {
        const payload = {
            name: formData.get('name'),
        }

        const response = await fetch(base_url + '/categories', {
            method: "POST",
            cache: "no-store",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.log('Server Failed - ', error);
    }
}