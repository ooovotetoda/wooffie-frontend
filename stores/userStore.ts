import type { FetchContext } from "ofetch";

export const useUserStore = defineStore('user', () => {
  const { $ofetch } = useNuxtApp()

  const user = {
    loggedIn: ref<boolean>(false),
    id: ref<number | null>(null),
    phoneNumber: ref<string | null>(null),
  }

  async function verifyAccess() {
    const accessTokenCookie = useCookie('access_token')
    const refreshTokenCookie = useCookie('refresh_token')

    let statusCode = 0
    if (accessTokenCookie.value && refreshTokenCookie.value) {
      try {
        const data = await $ofetch(`/api/session/verify`, {
          method: 'POST',
          body: {
            access_token: accessTokenCookie.value,
          },
          onResponse(context: FetchContext) {
            statusCode = context.response?.status || 0
          },
        })

        if (data.status === 'OK') {
          user.id.value = data.user.id
          user.phoneNumber.value = data.user.phone
          user.loggedIn.value = true
        }
      }
      catch (e) {
        if (statusCode === 401) {
          try {
            const data = await $ofetch(`/api/session/refresh`, {
              method: 'POST',
              body: {
                refresh_token: refreshTokenCookie.value,
              },
              onResponse(context: FetchContext) {
                statusCode = context.response?.status || 0
              },
            })

            if (data.status === 'OK') {
              user.id.value = data.user.id
              user.phoneNumber.value = data.user.phone
              user.loggedIn.value = true

              accessTokenCookie.value = data.tokens.access_token
              refreshTokenCookie.value = data.tokens.refresh_token
            }
          }
          catch (e) {
            console.error(e)
          }
        }
        else {
          console.error(e)
        }
      }
    }
  }

  async function signIn(body: Object): Promise<number> {
    const accessTokenCookie = useCookie('access_token')
    const refreshTokenCookie = useCookie('refresh_token')

    let statusCode = 0

    try {
      const data = await $ofetch(`/api/user/login`, {
        method: 'POST',
        body,
        onResponse(context: FetchContext) {
          statusCode = context.response?.status || 500
        },
      })
      if (data.status === 'OK') {
        accessTokenCookie.value = data.tokens.access_token
        refreshTokenCookie.value = data.tokens.refresh_token

        user.id.value = data.user.id
        user.phoneNumber.value = data.user.phone
        user.loggedIn.value = true

        await navigateTo('/')
      }
      else {
        // TODO: wrong password alert
        console.error('wrong password')
      }
    }
    catch (e) {
      console.error(e)
    }

    return statusCode
  }

  async function signUp(password: string | null) {
    const accessTokenCookie = useCookie('access_token')
    const refreshTokenCookie = useCookie('refresh_token')

    try {
      const data = await $ofetch(`/api/user/register`, {
        method: 'POST',
        credentials: 'include',
        body: {
          password,
        },
      })
      if (data.status === 'OK') {
        accessTokenCookie.value = data.tokens.access_token
        refreshTokenCookie.value = data.tokens.refresh_token

        user.id.value = data.user.id
        user.phoneNumber.value = data.user.phone
        user.loggedIn.value = true

        sessionStorage.clear()
      }
      else {
        console.error(data.error)
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  function signOut() {
    const accessTokenCookie = useCookie('access_token')
    const refreshTokenCookie = useCookie('refresh_token')

    accessTokenCookie.value = null
    refreshTokenCookie.value = null

    user.id.value = null
    user.phoneNumber.value = null
    user.loggedIn.value = false
  }

  return { verifyAccess, signIn, signUp, signOut, user }
})
