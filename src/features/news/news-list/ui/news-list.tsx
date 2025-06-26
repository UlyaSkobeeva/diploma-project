import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../shared/ui/button'

import styles from './news-list.module.css'
import { NewsListProps } from '../types/news-list-props'
import { RoutePath } from '../../../../shared/types/route-path'
import { useEffect } from 'react'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/lib/utils/use-app'
import { fetchNews, removeNews } from '../../../../app/store/news/news-action'
import { NewsSelector } from '../../../../app/store/news/news-slice'
import dayjs from 'dayjs'

export const NewsList = (props: NewsListProps) => {
  const { user } = props

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const newsStore = useAppSelector(NewsSelector)

  useEffect(() => {
    !newsStore.length && dispatch(fetchNews())
  }, [])

  const removeNewItem = (id: number) => {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      dispatch(removeNews(id))
    }
  }

  const news = [...newsStore].sort((a, b) => {
    return dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
  })

  return (
    <div className={styles['news__list']}>
      {news.map(({ id, smallImg, smallTitle }) => (
        <div className={styles['news__item']} key={id}>
          <div className={styles['news__img']}>
            <img
              src={
                smallImg ||
                'https://cdn-icons-png.flaticon.com/128/1629/1629161.png'
              }
              alt="картинка"
            />
          </div>
          <div className={styles['news__text']}>
            <p>{smallTitle}</p>
            <a onClick={() => navigate(RoutePath.newsDetail + id)}>
              Читать больше →
            </a>
          </div>

          {user?.isAdmin && (
            <div>
              <Button
                className={styles['news-controls__button']}
                onClick={() => {
                  navigate(RoutePath.newsEdit + id)
                }}
              >
                Изменить
              </Button>
              <Button
                className={styles['news-controls__button']}
                onClick={() => removeNewItem(id)}
              >
                Удалить
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
