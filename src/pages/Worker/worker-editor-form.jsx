import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { CustomForm } from '../../shared/ui/custom-form'
import { changingInputState } from '../../shared/lib/utils/changing-input-state'

export const WorkerEditorForm = (props) => {
  const { isCreate } = props
  const { workerId } = useParams() //для редактирования

  const navigate = useNavigate()

  const [workerData, setWorkerData] = useState({
    name: '',
    job: '',
    number: '',
    mail: '',
    birthday: '',
    img: '',
  })

  //для редактирования
  useEffect(() => {
    !isCreate &&
      fetch('/api/worker/' + workerId)
        .then((res) => {
          return res.json()
        })
        .then((resp) => {
          setWorkerData({
            name: resp.name,
            job: resp.job,
            number: resp.number,
            mail: resp.mail,
            birthday: resp.birthday,
            img: resp.img,
          })
        })
        .catch((err) => {
          console.log(err.message)
        })
  }, [])

  const handlesubmit = (e) => {
    e.preventDefault()

    fetch(isCreate ? '/api/worker' : `/api/worker/${workerId}`, {
      method: isCreate ? 'POST' : 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(workerData),
    })
      .then((res) => {
        alert(
          isCreate
            ? 'Информация о новом сотруднике успешно добавлена!'
            : 'Информация изменена!',
        )
        navigate('/worker')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const handleChangeInput = (e) => changingInputState(e, setWorkerData)

  //поля для формы
  const fields = [
    {
      label: 'ФИО', //обязательно
      type: 'text',
      name: 'name',
      value: workerData.name,
      onChange: handleChangeInput,
      required: true,
    },
    {
      label: 'Должность', //обязательно
      type: 'text',
      name: 'job',
      value: workerData.job,
      onChange: handleChangeInput,
      required: true,
    },
    {
      label: 'Номер телефона', //обязательно
      type: 'text',
      name: 'number',
      value: workerData.number,
      onChange: handleChangeInput,
    },
    {
      label: 'Эл. почта',
      type: 'text',
      name: 'mail',
      value: workerData.mail,
      placeholder: '...@mail.ru',
      onChange: handleChangeInput,
    },
    {
      label: 'Дата рождения',
      type: 'date',
      name: 'birthday',
      value: workerData.birthday,
      onChange: handleChangeInput,
    },
    {
      label: 'Фото',
      type: 'text',
      name: 'img',
      value: workerData.img,
      placeholder: 'URL-адрес',
      onChange: handleChangeInput,
    },
  ]

  return (
    <CustomForm
      fields={fields}
      title={
        isCreate ? 'Добавить нового сотрудника' : 'Редактирование информации'
      }
      onSubmit={handlesubmit}
      onCancel={() => navigate('/worker')}
      submitBtn={isCreate ? 'Добавить' : 'Сохранить'}
    />
  )
}
