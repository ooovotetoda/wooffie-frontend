export default function (startTimeString: string, endTimeString: string): boolean {
  function createTime(dateString: string): Date {
    return new Date(`1970-01-01T${dateString}`)
  }

  const startTime: Date = createTime(startTimeString)
  const endTime: Date = createTime(endTimeString)

  const currentTime: Date = new Date()
  currentTime.setFullYear(1970, 0, 1)

  return currentTime >= startTime && currentTime <= endTime
}
