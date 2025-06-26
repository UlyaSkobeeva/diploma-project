import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { changingInputState } from '../../../../shared/lib/utils/changing-input-state'
import { CustomForm } from '../../../../shared/ui/custom-form'
import { CalendarEditorFormProps } from '../types'
import { Calendar, Field, FieldType } from '../../../../shared/types'
import { RoutePath } from '../../../../shared/types/route-path'

import {
  addCalendar,
  fetchCalendarById,
  updateCalendar,
} from '../../../../app/store/calendars/calendars-action'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/lib/utils/use-app'
import { CalendarByIdSelector } from '../../../../app/store/calendars/calendars-slice'

export const CalendarEditorForm = (props: CalendarEditorFormProps) => {
  const { isCreate } = props
  const { calendarId } = useParams()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const storeCalendar = useAppSelector(CalendarByIdSelector)

  const [calendarData, setCalendarData] = useState<Omit<Calendar, 'id'>>({
    date: '',
    title: '',
    description: '',
    details: '',
  })

  useEffect(() => {
    !isCreate && dispatch(fetchCalendarById(Number(calendarId)))
  }, [dispatch, isCreate, calendarId])

  useEffect(() => {
    !isCreate && storeCalendar && setCalendarData(storeCalendar)
  }, [storeCalendar])

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isCreate) {
      dispatch(addCalendar(calendarData))
    } else {
      dispatch(updateCalendar(calendarData as Calendar))
    }

    navigate(RoutePath.home)
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    changingInputState(e, setCalendarData)

  const fields: Field[] = [
    {
      label: 'Заголовок',
      type: FieldType.text,
      name: 'title',
      value: calendarData.title,
      onChange: handleChangeInput,
      required: true,
      needWarning: true,
    },
    {
      label: 'Дата',
      type: FieldType.date,
      name: 'date',
      value: calendarData.date,
      onChange: handleChangeInput,
      required: true,
      needWarning: true,
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
