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
        const data = await $fetch(`${config.public.baseUrl}/api/user/verify`, {
          method: "GET",
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

          await navigateTo("/")
        } else {
          if (statusCode === 401) {
            try {
              const data = await $fetch(`${config.public.baseUrl}/api/user/refresh`, {
                method: "POST",
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
              }
            } catch (e) {
              console.error(e)
            }
          }
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  async function signIn(body: Object) {
    const accessTokenCookie = useCookie('access_token');
    const refreshTokenCookie = useCookie('refresh_token');

    try {
      const data = await $fetch(`${config.public.baseUrl}/api/user/login`, {
        method: "POST",
        body: body
      })
      if (data.status === "OK") {
        accessTokenCookie.value = data.access_token;
        refreshTokenCookie.value = data.refresh_token;

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

  async function signUp(phone: string | null, password: string | null,) {
    const accessTokenCookie = useCookie('access_token');
    const refreshTokenCookie = useCookie('refresh_token');

    try {
      const data = await $fetch(`${config.public.baseUrl}/api/user/register`, {
        method: "POST",
        body: {
          phone: phone,
          password: password,
        }
      })
      if (data.status === "OK") {
        accessTokenCookie.value = data.access_token;
        refreshTokenCookie.value = data.refresh_token;

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