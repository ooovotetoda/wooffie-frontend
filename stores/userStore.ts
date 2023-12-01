export const useUserStore = defineStore('user', () => {
  const user = {
    loggedIn: ref<boolean>(true),
    userId: ref<number | null>(null),
    userPhoneNumber: ref<number | null>(null),
    city: ref<string>("krd"),
  }

  function signIn() {
    user.loggedIn.value = true
  }

  function signOut() {
    user.loggedIn.value = false
  }

  function signUp(phoneNumber: number) {
    user.loggedIn.value = true
    user.userPhoneNumber.value = phoneNumber
  }

  function selectCity(val: string) {
    user.city.value = val
  }

  return { signIn, signUp, signOut, selectCity, user }
})