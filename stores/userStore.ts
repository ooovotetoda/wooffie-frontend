export const useUserStore = defineStore('user', () => {
  const user = {
    loggedIn: ref<boolean>(true),
    userId: ref<number | null>(null),
    userPhoneNumber: ref<number | null>(null),
  }

  function login() {
    user.loggedIn.value = true
  }

  function signUp(phoneNumber: number) {
    user.loggedIn.value = true
    user.userPhoneNumber.value = phoneNumber
  }

  return { login, signUp, user }
})