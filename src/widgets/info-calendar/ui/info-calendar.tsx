import { useNavigate } from 'react-router-dom'

import { Button } from '../../../shared/ui/button'
import { InfoCalendarList } from '../../../features/info-calendar/info-calendar-list'
import { RoutePath } from '../../../shared/types/route-path'
import { InfoCalendarProps } from '../types'
import styles from './info-calendar.module.css'
export const InfoCalendar = (props: InfoCalendarProps) => {
  const { user } = props

  const navigate = useNavigate()

  return (
    <div className={styles['info-calendar']}>
      {user?.isAdmin && (
        <Button onClick={() => navigate(RoutePath.calendarCreate)}>
          Добавить новое событие
        </Button>
      )}

      <h2 className={styles['info-calendar__title']}>Ближайшие события</h2>

      <InfoCalendarList user={user} />
    </div>
  )
}
