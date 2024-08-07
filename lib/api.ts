import { getToken } from "./helper";

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
    payload?: object | FormData,
}

class Api {
    static async fetch({uri, method, headers = {}, payload = {}}: ApiProps): Promise<Response> {
        try {
            const isFormData = payload instanceof FormData;
            const body = isFormData ? payload : JSON.stringify(payload);

            const headersConfig: { [key: string]: string; } = {
                "Accept": "application/json",
                'Cache-Control': 'no-store',
                "Authorization": "Bearer " + getToken(),
                ...headers,
            }; 
            if(!isFormData) {
                headersConfig["Content-Type"] = "application/json";
            }

            const response = await fetch(base_url + uri, {
                method: method,
                cache: 'no-store',
                headers: headersConfig,
                body: method === "GET" ? null : body,
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