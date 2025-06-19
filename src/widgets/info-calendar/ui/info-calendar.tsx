import { useNavigate } from 'react-router-dom'

import { Button } from '../../../shared/ui/button'
import { InfoCalendarList } from '../../../features/info-calendar/info-calendar-list'
import { RoutePath } from '../../../shared/types/route-path'
import styles from './info-calendar.module.css'
import { Context } from '../../../app/App'
import { useContext } from 'react'

export const InfoCalendar = () => {
  const user = useContext(Context)
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
