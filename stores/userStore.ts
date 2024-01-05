export const useUserStore = defineStore('user', () => {
  const user = {
    loggedIn: ref<boolean>(true),
    userId: ref<number | null>(null),
    userPhoneNumber: ref<number | null>(null),
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

  return { signIn, signUp, signOut, user }
})