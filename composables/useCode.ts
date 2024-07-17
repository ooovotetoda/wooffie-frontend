import type {Ref} from "vue";

export function useCode(element: Ref) {
  const code = ref < string | null > (null)
  const isCodeFocused = ref < boolean > (false)

  const validateCode = () => {
    const maxLength = 6
    if (code.value && code.value.length > maxLength) {
      code.value = code.value.slice(0, maxLength)
    }
  }

  return { code, isCodeFocused, validateCode }
}
