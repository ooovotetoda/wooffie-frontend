import {$fetch} from "ofetch";

export default async function () {
    const config = useRuntimeConfig()

    try {
        const phone = sessionStorage.getItem("phone")
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