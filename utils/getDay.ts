export default function (): number {
  const today = new Date()
  const day = today.getDay()
  return (day + 6) % 7
}
