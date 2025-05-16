import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../shared/ui/button'

import styles from './news-detail.module.css'

export const NewsDetail = () => {
  const { newsid } = useParams()

  const navigate = useNavigate()

  const [newsData, setNewsData] = useState({})

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
        <h2 className={styles['news-detail__title']}>{newsData.title}</h2>
        <div className={styles['news-detail__content']}>
          <div className={styles['description']}>{newsData.description}</div>
          <img className={styles['image']} src={newsData.img} alt="" />
          <div className={styles['details']}>{newsData.details}</div>
        </div>
        <div className={styles['detail-cancel']}>
          <Button onClick={() => navigate('/')}>Назад</Button>
        </div>
      </div>
    </div>
  )
}
