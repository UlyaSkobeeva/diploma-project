import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../shared/ui/button'

import styles from './info-calendar-detail.module.css'

export const InfoCalendarDetail = () => {
  const { calenid } = useParams()

  const [calendars, setCalendars] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/calendar/' + calenid)
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        setCalendars(resp)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  return (
    // calendars && (
    <div className={styles['info-calendar-detail']}>
      <div className={styles['info-calendar-detail__container']}>
        <div className={styles['info-calendar-detail__date']}>
          {calendars.date}
        </div>
        <h2 className={styles['info-calendar-detail__title']}>
          {calendars.title}
        </h2>
        <div className={styles['info-calendar-detail__content']}>
          <div className={styles['description']}>{calendars.description}</div>
          <div className={styles['details']}>{calendars.details}</div>
        </div>

        <div className={styles['info-calendar-detail__button']}>
          <Button onClick={() => navigate('/')}>Назад</Button>
        </div>
      </div>
    </div>
    // )
  )
}
