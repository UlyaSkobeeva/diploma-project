import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import styles from './news-detail.module.css'
import { Button } from '../../../shared/ui/button'
import { RoutePath } from '../../../shared/types/route-path'
import { formatLongDate } from '../../../shared/lib/utils/format-date'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/utils/use-app'
import { NewsByIdSelector } from '../../../app/store/news/news-slice'
import { fetchNewsById } from '../../../app/store/news/news-action'

export const NewsDetail = () => {
  const { newsId } = useParams()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const newsData = useAppSelector(NewsByIdSelector)

  useEffect(() => {
    dispatch(fetchNewsById(Number(newsId)))
  }, [])

  return (
    <div className={styles['news-detail']}>
      <div className={styles['news-detail__container']}>
        <h2 className={styles['news-detail__title']}>{newsData?.title}</h2>
        <div className={styles['news-detail__content']}>
          <div className={styles['description']}>{newsData?.description}</div>
          <img className={styles['image']} src={newsData?.img} alt="" />
          <div className={styles['details']}>{newsData?.details}</div>
          <div className={styles['date']}>
            {newsData?.date && formatLongDate(newsData.date)}
          </div>
        </div>
        <div className={styles['detail-cancel']}>
          <Button onClick={() => navigate(RoutePath.home)}>Назад</Button>
        </div>
      </div>
    </div>
  )
}
