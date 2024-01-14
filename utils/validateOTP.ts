import {$fetch} from "ofetch";

export default async function () {
    const config = useRuntimeConfig()

    try {
        const phone = sessionStorage.getItem("phone")
        const code = sessionStorage.getItem("code")
        let statusCode = 0;

        const response = await $fetch(`/api/otp/validate`, {
            method: "POST",
            baseURL: config.public.baseUrl,
            credentials: "include",
            body: {
                phone: phone,
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