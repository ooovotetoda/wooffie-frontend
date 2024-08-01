export default function (timestamp: string | null): string | null {
  if (!timestamp) {
    return '01.01.2024'
  }

  const date = new Date(timestamp)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}
