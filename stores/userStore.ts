export const useUserStore = defineStore('user', () => {
  const loggedIn = ref<boolean>(false)
  const userId = ref<number | null>(null)
  const userPhoneNumber = ref<number | null>(null)

  function login() {
    loggedIn.value = true
  }

  function signUp(phoneNumber: number) {
    loggedIn.value = true
    userPhoneNumber.value = phoneNumber
  }
})