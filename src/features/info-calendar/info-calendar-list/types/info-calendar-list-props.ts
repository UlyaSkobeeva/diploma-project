import { Calendar, User } from '../../../../shared/types'

export interface InfoCalendarListProps {
  calendars: Calendar[]
  user: User | null
  getCalendarData(): void
}
