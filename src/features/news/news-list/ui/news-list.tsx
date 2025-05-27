import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../shared/ui/button'

import styles from './news-list.module.css'
import { NewsListProps } from '../types/news-list-props'
import { RoutePath } from '../../../../shared/types/route-path'

export const NewsList = (props: NewsListProps) => {
  const { user, news, getNewsData } = props

  const navigate = useNavigate()

  const removeNewItem = (id?: number) => {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      fetch('/api/news/' + id, {
        method: 'DELETE',
      })
        .then(() => {
          getNewsData()
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }

  return (
    <div className={styles['news__list']}>
      {news.map(({ id, smallImg, smallTitle }) => (
        <div className={styles['news__item']} key={id}>
          <div className={styles['news__img']}>
            <img src={smallImg} alt="" />
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
