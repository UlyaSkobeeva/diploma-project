import classNames from 'classnames'

import styles from './idea-list.module.css'
import { IdeaListProps } from '../types'

export const IdeaList = (props: IdeaListProps) => {
  const { ideas, user, getIdeas } = props

  const updateIdea = async (id: number) => {
    const todo = ideas.find((idea) => idea.id === id)

    if (!todo) {
      return
    }

    await fetch(`/api/idea/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        id: todo.id,
        titleOfIdea: todo.titleOfIdea,
        isDone: !todo.isDone,
      }),
    })

    getIdeas()
  }

  const deleteIdea = async (id: number) => {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      const todo = ideas.find((idea) => idea.id === id)

      if (!todo) {
        return
      }

      await fetch(`/api/idea/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      })
    }
    getIdeas()
  }

  return (
    <>
      {ideas.map(({ id, isDone, titleOfIdea }) => (
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
