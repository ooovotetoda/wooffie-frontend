import type { Ref } from 'vue'

export function useAuthPhone(el: Ref) {
  const phone = ref < string | null > (null)
  const isPhoneFocused = ref < boolean > (false)

  function getPhoneValid(): boolean {
    const regExp = /^(?:\+7|8)?[789]\d{9}$/
    return phone.value ? regExp.test(phone.value) : true
  }

  return { phone, isPhoneFocused, getPhoneValid }
}
