import {$fetch} from "ofetch";

export default async function (phone: string) {
    const config = useRuntimeConfig()

    try {
        let statusCode = 0;

        const response = await $fetch(`/api/otp/send`, {
            method: "POST",
            baseURL: config.public.baseUrl,
            credentials: "include",
            body: {
                phone: phone
            },
            onResponse(context) {
                statusCode = context.response.status
            },
        })

        return response.status
    } catch (e) {
        console.log(e)
    }
}