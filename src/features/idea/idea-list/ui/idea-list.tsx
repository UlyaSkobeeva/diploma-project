import classNames from 'classnames'

import styles from './idea-list.module.css'
import { IdeaListProps } from '../types'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/lib/utils/use-app'
import { useEffect } from 'react'
import {
  fetchIdeas,
  removeIdea,
  toggleIdea,
} from '../../../../app/store/ideas/ideas-action'
import { ideaSelector } from '../../../../app/store/ideas/ideas-slice'

export const IdeaList = (props: IdeaListProps) => {
  const { user } = props

  const ideas = useAppSelector(ideaSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchIdeas())
  }, [])

  const updateIdea = (id: number) => {
    const todo = ideas.find((idea) => idea.id === id)

    if (!todo) {
      return
    }

    dispatch(
      toggleIdea({
        ...todo,
        isDone: !todo.isDone,
      }),
    )
  }

  const deleteIdea = (id: number) => {
    //TODO модальное окно
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      const todo = ideas.find((idea) => idea.id === id)

      if (!todo) {
        return
      }

      dispatch(removeIdea(id))
    }
  }

  const sortedIdeas = [...ideas].sort((a, b) => b.id - a.id)

  return (
    <>
      {sortedIdeas.map(({ id, isDone, titleOfIdea }) => (
        <div key={id}>
          <div className={styles['list__info']}>
            <button onClick={() => updateIdea(id)} disabled={!user?.isAdmin}>
              {isDone ? '✅' : '🕘'}
            </button>

            {user?.isAdmin && (
              <button onClick={() => deleteIdea(id)} disabled={!user?.isAdmin}>
                ❌
              </button>
            )}

            <p
              className={classNames(
                styles['list__title'],
                isDone && styles['list__title--completed'],
              )}
            >
              {titleOfIdea}
            </p>
          </div>
        </div>
      ))}
    </>
  )
}
