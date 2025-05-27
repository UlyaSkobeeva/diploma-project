//посмотреть классы, переименовать функции, разделить компонент

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './news.module.css'

import { Button } from '../../../shared/ui/button'
import { NewsList } from '../../../features/news/news-list'
import { NewsProps } from '../types/news-props'
import { News as NewsData } from '../../../shared/types'
import { RoutePath } from '../../../shared/types/route-path'

export const News = (props: NewsProps) => {
  const { user } = props

  //получение данных с сервера
  const [news, setNews] = useState<NewsData[]>([])

  const navigate = useNavigate()

  //получение данных с сервера
  const getNewsData = () => {
    fetch('/api/news?_sort=id&_order=desc')
      .then((response) => {
        return response.json()
      })
      .then((newsData) => {
        setNews(newsData)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  useEffect(() => {
    getNewsData()
  }, [])

  return (
    <div className={styles['news']}>
      <div className="container">
        {user?.isAdmin && (
          <Button
            className={styles['news-create__button']}
            onClick={() => navigate(RoutePath.newsCreate)}
          >
            Добавить новую новость
          </Button>
        )}

        <h2 className={styles['news__logo']}>Последние новости</h2>

        <NewsList user={user} news={news} getNewsData={getNewsData} />
      </div>
    </div>
  )
}
