import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { CustomForm } from '../../../shared/ui/custom-form'
import { Button } from '../../../shared/ui/button'

import { FieldType, Idea } from '../../../shared/types'

import { IdeaList } from '../../../features/idea/idea-list'

import { IdeaPageProps } from '../types'
import styles from './idea-page.module.css'

export const IdeaPage = (props: IdeaPageProps) => {
  const { user } = props

  const [ideas, setIdeas] = useState<Idea[]>([])
  const [titleOfIdea, setTitleOfIdea] = useState<string>('')

  const getIdeas = async () => {
    await fetch('/api/idea?_sort=id&_order=desc')
      .then((res) => res.json())
      .then((data) => setIdeas(data))
  }

  useEffect(() => {
    getIdeas()
  }, [])

  const handleFilter = async (value: string) => {
    await fetch(`/api/idea?isDone=${value}`)
      .then((res) => res.json())
      .then((data) => setIdeas(data))
  }

  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const idea = { titleOfIdea, isDone: false }

    await fetch('/api/idea', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(idea),
    })
    setTitleOfIdea('')
    getIdeas()
  }

  const fields = [
    {
      type: FieldType.textarea,
      name: 'titleOfIdea',
      value: titleOfIdea,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setTitleOfIdea(e.target.value.trimStart()),
      required: true,
    },
  ]

  return (
    <>
      <CustomForm
        fields={fields}
        onSubmit={handlesubmit}
        title="Поделитесь идеями по улучшению работы компании или web-портала! Помогите нам стать лучше!"
        submitBtnTitle="Добавить"
        containerClassName={styles['idea-page']}
        titleClassName={styles['idea-page__title']}
        buttonsClassName={styles['idea-page__button']}
      />

      {/* может как-то переделать фильтрацию, когда подключу редакс  */}
      <div className={styles['idea-page__container']}>
        <div className={styles['controls__button']}>
          <Button onClick={() => handleFilter('false')}>В работе</Button>
          <Button onClick={() => handleFilter('true')}>Выполнено</Button>
          <Button onClick={() => getIdeas()}>ВСЕ</Button>
        </div>

        <IdeaList ideas={ideas} getIdeas={getIdeas} user={user} />
      </div>
    </>
  )
}
