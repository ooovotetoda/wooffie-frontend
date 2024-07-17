import type {RemovableRef} from "@vueuse/core";

export function useAuthCode(
  authStorage: RemovableRef<{ phone: string, password: string }>,
  signUp: (password: string | null) => Promise<void>
) {
  const route = useRoute()

  const phone = authStorage.value.phone

  const code = ref < string | null > (null)
  const isCodeSent = ref < boolean > (false)
  const isCodeValid = ref < boolean > (true)

  async function handleSubmit() {
    if (!code.value || code.value.length < 4) {
      isCodeValid.value = false
      return
    }

    const password = authStorage.value.password

    const isValid = await validateOTP(code.value)

    if (isValid) {
      if (route.query.type === 'register') {
        if (!password) {
          return
        }

        await signUp(password)
        await navigateTo('/')
      }
      else if (route.query.type === 'reset') {
        await navigateTo('/auth/newpass')
      }
    }
    else {
      console.warn('code not valid')
    }
  }

  async function resendCode(resetTimer: () => void, startTimer: (duration: number) => void) {
    if (isCodeSent.value)
      return

    resetTimer()
    startTimer(5900)

    if (phone) {
      await sendOTP(phone)
    }
    else {
      console.error('invalid phone number')
    }
  }

  return { phone, code, isCodeSent, isCodeValid, handleSubmit, resendCode }
}
