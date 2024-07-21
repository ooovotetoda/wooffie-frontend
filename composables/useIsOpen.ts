import type { Organization, Schedule } from '~/types/organization'
import getDay from '~/utils/getDay'

export function useIsOpen(organization: Organization) {
  const schedule: Schedule | undefined = organization.schedule.find((schedule: Schedule) => schedule.day_of_week === getDay())
  const startTime = schedule?.start_time ? schedule?.start_time.slice(0, -3) : null
  const endTime = schedule?.end_time ? schedule?.end_time.slice(0, -3) : null
  const time = (startTime && endTime) ? `${startTime} - ${endTime}` : 'не работает'

  return { time }
}
