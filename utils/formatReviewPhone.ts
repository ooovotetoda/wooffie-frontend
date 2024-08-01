export default function (phone: string | null): string | null {
  if (!phone) {
    return phone
  }

  const digits = phone.replace(/\D/g, '')

  if (digits.startsWith('7') && digits.length === 11) {
    return `+${digits.slice(0, 1)} ${digits.slice(1, 4)} ${digits.slice(4, 6)} XX XXX`
  }
  else {
    return phone
  }
}
