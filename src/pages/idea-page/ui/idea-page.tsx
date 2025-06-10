import { ChangeEvent, FormEvent, useContext, useState } from 'react'

import { CustomForm } from '../../../shared/ui/custom-form'
import { FieldType } from '../../../shared/types'
import { IdeaList } from '../../../features/idea/idea-list'
import styles from './idea-page.module.css'

import { useAppDispatch } from '../../../shared/lib/utils/use-app'
import { addIdea } from '../../../app/store/ideas/ideas-action'
import { StatusSwitcher } from '../../../features/idea/status-switcher'
import { Context } from '../../../app/App'

export const IdeaPage = () => {
  const [titleOfIdea, setTitleOfIdea] = useState<string>('')

  const user = useContext(Context)

  const dispatch = useAppDispatch()

  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const idea = { titleOfIdea, isDone: false }

    dispatch(addIdea(idea))
    setTitleOfIdea('')
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

      <div className={styles['idea-page__container']}>
        <StatusSwitcher />
        <IdeaList user={user} />
      </div>
    </>
  )
}
