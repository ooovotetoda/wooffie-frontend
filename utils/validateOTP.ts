import type { FetchContext } from 'ofetch'

export default async function (code: string) {
  const { $ofetch } = useNuxtApp()

  try {
    let statusCode = 0

    const response = await $ofetch(`/api/otp/validate`, {
      method: 'POST',
      credentials: 'include',
      body: {
        code,
      },
      onResponse(context: FetchContext) {
        statusCode = context.response?.status || 0
      },
    })

    return response.valid
  }
  catch (e) {
    console.error(e)
  }
}
