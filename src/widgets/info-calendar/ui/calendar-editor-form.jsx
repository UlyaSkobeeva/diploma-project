import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { CustomForm } from '../../../shared/ui/custom-form'
import { changingInputState } from '../../../shared/lib/utils/changing-input-state'

export const CalendarEditorForm = (props) => {
  const { isCreate } = props
  const { calendarId } = useParams() //для редактирования

  const navigate = useNavigate()

  const [calendarData, setCalendarData] = useState({
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

  //отправить форму
  const submitHandler = (event) => {
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
        navigate('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const handleChangeInput = (e) => changingInputState(e, setCalendarData)

  //поля для формы
  const fields = [
    {
      label: 'Заголовок', //обязательно
      type: 'text',
      name: 'title',
      value: calendarData.title,
      onChange: handleChangeInput,
      required: true,
    },
    {
      label: 'Дата', //обязательно
      type: 'date',
      name: 'date',
      value: calendarData.date,
      onChange: handleChangeInput,
      required: true,
    },
    {
      label: 'Описание',
      type: 'textarea',
      name: 'description',
      value: calendarData.description,
      onChange: handleChangeInput,
    },
    {
      label: 'Дополнительная информация',
      type: 'textarea',
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
      onCancel={() => navigate('/')}
      submitBtn={isCreate ? 'Добавить' : 'Сохранить'}
    />
  )
}
