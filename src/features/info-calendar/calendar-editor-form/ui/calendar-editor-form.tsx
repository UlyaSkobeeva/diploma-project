import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { changingInputState } from '../../../../shared/lib/utils/changing-input-state'
import { CustomForm } from '../../../../shared/ui/custom-form'
import { CalendarEditorFormProps } from '../types'
import { Calendar, FieldType } from '../../../../shared/types'
import { RoutePath } from '../../../../shared/types/route-path'

export const CalendarEditorForm = (props: CalendarEditorFormProps) => {
  const { isCreate } = props
  const { calendarId } = useParams()

  const navigate = useNavigate()

  const [calendarData, setCalendarData] = useState<Calendar>({
    date: '',
    title: '',
    description: '',
    details: '',
  })

  useEffect(() => {
    !isCreate &&
      fetch('/api/calendar/' + calendarId)
        .then((res) => {
          return res.json()
        })
        .then((resp) => {
          setCalendarData({
            date: resp.date,
            title: resp.title,
            description: resp.description,
            details: resp.details,
          })
        })
        .catch((err) => {
          console.log(err.message)
        })
  }, [])

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    fetch(isCreate ? '/api/calendar' : `/api/calendar/${calendarId}`, {
      method: isCreate ? 'POST' : 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(calendarData),
    })
      .then((res) => {
        isCreate
          ? alert('Информация о новом событии успешно добавлена!')
          : alert('Информация изменена!')
        navigate(RoutePath.home)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    changingInputState(e, setCalendarData)

  const fields = [
    {
      label: 'Заголовок',
      type: FieldType.text,
      name: 'title',
      value: calendarData.title,
      onChange: handleChangeInput,
      required: true,
    },
    {
      label: 'Дата',
      type: FieldType.date,
      name: 'date',
      value: calendarData.date,
      onChange: handleChangeInput,
      required: true,
    },
    {
      label: 'Описание',
      type: FieldType.textarea,
      name: 'description',
      value: calendarData.description,
      onChange: handleChangeInput,
    },
    {
      label: 'Дополнительная информация',
      type: FieldType.textarea,
      name: 'details',
      value: calendarData.details,
      onChange: handleChangeInput,
    },
  ]

  return (
    <CustomForm
      title={isCreate ? 'Добавить новое событие' : 'Редактирование информации'}
      fields={fields}
      onSubmit={submitHandler}
      onCancel={() => navigate(RoutePath.home)}
      submitBtnTitle={isCreate ? 'Добавить' : 'Сохранить'}
    />
  )
}
