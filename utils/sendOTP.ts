export default async function (phone: string) {
    const { $ofetch } = useNuxtApp()

    try {
        let statusCode = 0;

        const response = await $ofetch(`/api/otp/send`, {
            method: "POST",
            credentials: "include",
            body: {
                phone: phone
            },
            onResponse(context: FetchContext) {
                statusCode = context.response.status
            },
        })

        return response.status
    } catch (e) {
        console.log(e)
    }
}