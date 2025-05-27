import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { CustomForm } from '../../../../shared/ui/custom-form'
import { changingInputState } from '../../../../shared/lib/utils/changing-input-state'
import { FieldType, WorkerData } from '../../../../shared/types'

import { WorkerEditorFormProps } from '../types'
import { RoutePath } from '../../../../shared/types/route-path'

export const WorkerEditorForm = (props: WorkerEditorFormProps) => {
  const { isCreate } = props
  const { workerId } = useParams()

  const navigate = useNavigate()

  const [workerData, setWorkerData] = useState<WorkerData>({
    name: '',
    job: '',
    number: '',
    mail: '',
    birthday: '',
    img: '',
  })

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

  const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
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
        navigate(RoutePath.worker)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    changingInputState(e, setWorkerData)

  const fields = [
    {
      label: 'ФИО',
      type: FieldType.text,
      name: 'name',
      value: workerData.name,
      onChange: handleChangeInput,
      required: true,
    },
    {
      label: 'Должность',
      type: FieldType.text,
      name: 'job',
      value: workerData.job,
      onChange: handleChangeInput,
      required: true,
    },
    {
      label: 'Номер телефона',
      type: FieldType.text,
      name: 'number',
      value: workerData.number,
      onChange: handleChangeInput,
    },
    {
      label: 'Эл. почта',
      type: FieldType.text,
      name: 'mail',
      value: workerData.mail,
      placeholder: '...@mail.ru',
      onChange: handleChangeInput,
    },
    {
      label: 'Дата рождения',
      type: FieldType.date,
      name: 'birthday',
      value: workerData.birthday,
      onChange: handleChangeInput,
    },
    {
      label: 'Фото',
      type: FieldType.text,
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
      onCancel={() => navigate(RoutePath.worker)}
      submitBtnTitle={isCreate ? 'Добавить' : 'Сохранить'}
    />
  )
}
