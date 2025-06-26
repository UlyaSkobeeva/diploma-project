import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { CustomForm } from '../../../../shared/ui/custom-form'
import { changingInputState } from '../../../../shared/lib/utils/changing-input-state'
import { Field, FieldType, WorkerData } from '../../../../shared/types'

import { WorkerEditorFormProps } from '../types'
import { RoutePath } from '../../../../shared/types/route-path'

import {
  addWorker,
  fetchWorkerById,
  updateWorker,
} from '../../../../app/store/workers/workers-action'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/lib/utils/use-app'
import { workerByIdSelector } from '../../../../app/store/workers/workers-slice'

export const WorkerEditorForm = (props: WorkerEditorFormProps) => {
  const { isCreate } = props
  const { workerId } = useParams()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const workerStore = useAppSelector(workerByIdSelector)

  const [workerData, setWorkerData] = useState<Omit<WorkerData, 'id'>>({
    name: '',
    job: '',
    number: '',
    mail: '',
    date: '',
    img: '',
  })

  useEffect(() => {
    !isCreate && dispatch(fetchWorkerById(Number(workerId)))
  }, [dispatch, isCreate, workerId])

  useEffect(() => {
    !isCreate && workerStore && setWorkerData(workerStore)
  }, [workerStore])

  const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isCreate) {
      dispatch(addWorker(workerData))
    } else {
      dispatch(updateWorker(workerData as WorkerData))
    }
    navigate(RoutePath.worker)
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    changingInputState(e, setWorkerData)

  const fields: Field[] = [
    {
      label: 'ФИО',
      type: FieldType.text,
      name: 'name',
      value: workerData.name,
      onChange: handleChangeInput,
      required: true,
      needWarning: true,
    },
    {
      label: 'Должность',
      type: FieldType.text,
      name: 'job',
      value: workerData.job,
      onChange: handleChangeInput,
      required: true,
      needWarning: true,
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
      name: 'date',
      value: workerData.date,
      onChange: handleChangeInput,
    },
    {
      label: 'Фото',
      type: FieldType.text,
      name: 'img',
      value: workerData.img,
      placeholder: 'в формате https://...',
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
