import sendOTP from '~/utils/sendOTP'

export function useSignUp() {
  const authStorage = useSessionStorage('auth-store', { phone: '+79999999999', password: '', timer: '00' })

  const phone = ref < string | null > (null)
  const isPhoneValid = ref < boolean > (true)
  const password = ref < string | null > (null)
  const isPasswordValid = ref < boolean > (true)

  async function handleSubmit() {
    if (phone.value === null
      || password.value === null
      || password.value.length < 8
      || !isPhoneValid.value
      || !isPasswordValid.value) {
      return
    }

    if (phone.value.startsWith('8')) {
      phone.value = phone.value.replace('8', '+7')
    }

    authStorage.value.phone = phone.value
    authStorage.value.password = password.value

    const status = await sendOTP(phone.value)

    if (status === 'OK') {
      await navigateTo({
        path: '/auth/code',
        query: {
          type: 'register',
        },
      })
    }
    else {
      console.warn('failed to send OTP code')
    }
  }

  return { phone, isPhoneValid, password, isPasswordValid, handleSubmit }
}
