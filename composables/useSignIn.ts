import { useUserStore } from '~/stores/userStore'

export function useSignIn() {
  const { signIn } = useUserStore()

  const phone = ref < string | null > (null)
  const isPhoneValid = ref < boolean > (true)
  const password = ref < string | null > (null)
  const isPasswordValid = ref < boolean > (true)
  const isPasswordWrong = ref < boolean > (false)
  const body = computed(() => ({
    phone: phone.value,
    password: password.value,
  }))

  async function handleSubmit() {
    if (phone.value === null || !isPhoneValid) {
      isPhoneValid.value = false
      return
    }

    if (password.value === null || password.value.length < 8 || !isPasswordValid) {
      isPasswordValid.value = false
      return
    }

    if (body.value.phone?.startsWith('8')) {
      body.value.phone = body.value.phone?.replace('8', '+7')
    }

    const statusCode = await signIn(body.value)

    if (statusCode === 401 || statusCode === 404) {
      isPasswordWrong.value = true
    }
  }

  return { phone, isPhoneValid, password, isPasswordValid, isPasswordWrong, handleSubmit }
}
