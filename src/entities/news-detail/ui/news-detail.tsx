import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import styles from './news-detail.module.css'
import { Button } from '../../../shared/ui/button'
import { News } from '../../../shared/types'
import { RoutePath } from '../../../shared/types/route-path'
import { formatLongDate } from '../../../shared/lib/utils/format-date'

export const NewsDetail = () => {
  const { newsid } = useParams()

  const navigate = useNavigate()

  const [newsData, setNewsData] = useState<News | null>(null)

  useEffect(() => {
    fetch('/api/news/' + newsid)
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        setNewsData(resp)
      })
      .catch((err) => {
        console.log(err.message)
      })
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
