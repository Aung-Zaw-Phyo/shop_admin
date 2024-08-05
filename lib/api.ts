const base_url = process.env.NEXT_PUBLIC_BACKOFFICE_API;

interface Response {
    success: boolean;
    messages: string[];
    error: string | null;
    statusCode: number;
    data: any;
}

interface ApiProps {
    uri: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    headers?: object,
    payload?: object,
}

class Api {
    static async fetch({uri, method, headers = {}, payload = {}}: ApiProps): Promise<Response> {
        try {
            const response = await fetch(base_url + uri, {
                method: method,
                cache: 'no-store',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Cache-Control': 'no-store',
                    ...headers,
                },
                body: method === "GET"  ? null : JSON.stringify(payload),
            });
            const result = await response.json();
            const keys = 
                !("success" in result)
                !("messages" in result)
                !("error" in result)
                !("statusCode" in result)
                !("data" in result)
            if (result && keys) {
                throw new Error("Server Error Please Contact Admin.");
            }
            return result;
        } catch (error) {
            console.log("🚀 ~ Api ~ Error :", error);
            throw new Error("Server Error Please Contact Admin.");
        }
    }
}

export default Api;