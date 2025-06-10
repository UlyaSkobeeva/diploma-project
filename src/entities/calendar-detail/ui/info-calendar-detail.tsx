import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../shared/ui/button'

import styles from './info-calendar-detail.module.css'
import { RoutePath } from '../../../shared/types/route-path'
import { formatShortDate } from '../../../shared/lib/utils/format-date'
import { fetchCalendarById } from '../../../app/store/calendars/calendars-action'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/utils/use-app'
import { CalendarByIdSelector } from '../../../app/store/calendars/calendars-slice'

export const InfoCalendarDetail = () => {
  const { calendarId } = useParams()

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const calendar = useAppSelector(CalendarByIdSelector)

  useEffect(() => {
    dispatch(fetchCalendarById(Number(calendarId)))
  }, [])

  return (
    <div className={styles['info-calendar-detail']}>
      <div className={styles['info-calendar-detail__container']}>
        <div className={styles['info-calendar-detail__date']}>
          {calendar?.date && formatShortDate(calendar?.date)}
        </div>
        <h2 className={styles['info-calendar-detail__title']}>
          {calendar?.title}
        </h2>
        <div className={styles['info-calendar-detail__content']}>
          <div className={styles['description']}>{calendar?.description}</div>
          <div className={styles['details']}>{calendar?.details}</div>
        </div>

        <div className={styles['info-calendar-detail__button']}>
          <Button onClick={() => navigate(RoutePath.home)}>Назад</Button>
        </div>
      </div>
    </div>
  )
}
