import type { FetchContext } from "ofetch";

export default async function (phone: string) {
  const { $ofetch } = useNuxtApp()

  try {
    let statusCode = 0

    const response = await $ofetch(`/api/otp/send`, {
      method: 'POST',
      credentials: 'include',
      body: {
        phone,
      },
      onResponse(context: FetchContext) {
        statusCode = context.response?.status || 0
      },
    })

    return response.status
  }
  catch (e) {
    console.log(e)
  }
}
