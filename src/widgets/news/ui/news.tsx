import { useNavigate } from 'react-router-dom'

import styles from './news.module.css'

import { Button } from '../../../shared/ui/button'
import { NewsList } from '../../../features/news/news-list'

import { RoutePath } from '../../../shared/types/route-path'
import { Context } from '../../../app/App'
import { useContext } from 'react'

export const News = () => {
  const navigate = useNavigate()

  const user = useContext(Context)

  return (
    <div className={styles['news']}>
      {user?.isAdmin && (
        <Button
          className={styles['news-create__button']}
          onClick={() => navigate(RoutePath.newsCreate)}
        >
          Добавить новую новость
        </Button>
      )}

      <h2 className={styles['news__logo']}>Последние новости</h2>

      <NewsList user={user} />
    </div>
  )
}
