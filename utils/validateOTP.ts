import {$fetch} from "ofetch";

export default async function (code: string) {
    const config = useRuntimeConfig()

    try {
        let statusCode = 0;

        const response = await $fetch(`/api/otp/validate`, {
            method: "POST",
            baseURL: config.public.baseUrl,
            credentials: "include",
            body: {
                code: code
            },
            onResponse(context) {
                statusCode = context.response.status
            },
        })

        return response.valid
    } catch (e) {
        console.error(e)
    }
}