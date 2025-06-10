import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './news.module.css'

import { Button } from '../../../shared/ui/button'
import { NewsList } from '../../../features/news/news-list'
import { NewsProps } from '../types/news-props'
import { RoutePath } from '../../../shared/types/route-path'

export const News = (props: NewsProps) => {
  const { user } = props

  const navigate = useNavigate()

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

        <NewsList user={user} />
      </div>
    </div>
  )
}
