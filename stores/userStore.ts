import {$fetch} from "ofetch";

export const useUserStore = defineStore('user', () => {
  const config = useRuntimeConfig()

  const user = {
    loggedIn: ref<boolean>(false),
    id: ref<number | null>(null),
    phoneNumber: ref<string | null>(null),
  }

  async function verifyAccess() {
    const accessTokenCookie = useCookie('access_token');
    const refreshTokenCookie = useCookie('refresh_token');

    let statusCode = 0;
    if (accessTokenCookie.value && refreshTokenCookie.value) {
      try {
        const data = await $fetch(`/api/user/verify`, {
          method: "GET",
          baseURL: config.public.baseUrl,
          headers: {
            'Authorization': accessTokenCookie.value
          },
          onResponse(context) {
            statusCode = context.response.status
          },
        })

        if (data.status === "OK") {
          user.id.value = data.user.id
          user.phoneNumber.value = data.user.phone
          user.loggedIn.value = true
        }
      } catch (e) {
        if (statusCode === 401) {
          try {
            const data = await $fetch(`/api/user/refresh`, {
              method: "POST",
              baseURL: config.public.baseUrl,
              headers: {
                'Authorization': accessTokenCookie.value
              },
              body: {
                "refresh_token": refreshTokenCookie.value
              },
              onResponse(context) {
                statusCode = context.response.status
              },
            })

            if (data.status === "OK") {
              user.id.value = data.user.id
              user.phoneNumber.value = data.user.phone
              user.loggedIn.value = true

              accessTokenCookie.value = data.tokens.access_token
              refreshTokenCookie.value = data.tokens.refresh_token
            }
          } catch (e) {
            console.error(e)
          }
        }
      }
    }
  }

  async function signIn(body: Object) {
    const accessTokenCookie = useCookie('access_token');
    const refreshTokenCookie = useCookie('refresh_token');

    try {
      const data = await $fetch(`/api/user/login`, {
        method: "POST",
        baseURL: config.public.baseUrl,
        body: body
      })
      if (data.status === "OK") {
        accessTokenCookie.value = data.tokens.access_token;
        refreshTokenCookie.value = data.tokens.refresh_token;

        user.id.value = data.user.id
        user.phoneNumber.value = data.user.phone
        user.loggedIn.value = true

        await navigateTo("/")
      } else {
        //TODO: wrong password alert
        console.log("wrong password")
      }
    } catch (e) {
      console.error(e)
    }
  }

  async function signUp(password: string | null,) {
    const accessTokenCookie = useCookie('access_token');
    const refreshTokenCookie = useCookie('refresh_token');

    try {
      const data = await $fetch(`/api/user/register`, {
        method: "POST",
        baseURL: config.public.baseUrl,
        credentials: "include",
        body: {
          password: password,
        }
      })
      if (data.status === "OK") {
        accessTokenCookie.value = data.tokens.access_token;
        refreshTokenCookie.value = data.tokens.refresh_token;

        user.id.value = data.user.id
        user.phoneNumber.value = data.user.phone
        user.loggedIn.value = true

        sessionStorage.clear()
      } else {
        console.log(data.error)
      }
    } catch (e) {
      console.error(e)
    }
  }

  function signOut() {
    const accessTokenCookie = useCookie('access_token');
    const refreshTokenCookie = useCookie('refresh_token');

    accessTokenCookie.value = null;
    refreshTokenCookie.value = null;

    user.id.value = null
    user.phoneNumber.value = null
    user.loggedIn.value = false
  }

  return { verifyAccess, signIn, signUp, signOut, user }
})