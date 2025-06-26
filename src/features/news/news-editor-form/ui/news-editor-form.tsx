import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { NewsEditorFormProps } from '../types'
import { changingInputState } from '../../../../shared/lib/utils/changing-input-state'
import { CustomForm } from '../../../../shared/ui/custom-form'
import { Field, FieldType, FormatType, News } from '../../../../shared/types'
import { RoutePath } from '../../../../shared/types/route-path'
import dayjs from 'dayjs'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/lib/utils/use-app'
import { NewsByIdSelector } from '../../../../app/store/news/news-slice'
import {
  addNews,
  fetchNewsById,
  updateNews,
} from '../../../../app/store/news/news-action'

export const NewsEditorForm = (props: NewsEditorFormProps) => {
  const { isCreate } = props
  const { newsId } = useParams()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const storeNews = useAppSelector(NewsByIdSelector)

  const currentDate = isCreate ? dayjs().format(FormatType.api) : ''

  const [newsData, setNewsData] = useState<Omit<News, 'id'>>({
    smallTitle: '',
    smallImg: '',
    title: '',
    description: '',
    details: '',
    img: '',
    date: currentDate,
  })

  useEffect(() => {
    !isCreate && dispatch(fetchNewsById(Number(newsId)))
  }, [dispatch, isCreate, newsId])

  useEffect(() => {
    !isCreate && storeNews && setNewsData(storeNews)
  }, [storeNews])

  const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isCreate) {
      dispatch(addNews(newsData))
    } else {
      dispatch(updateNews(newsData as News))
    }
    navigate(RoutePath.home)
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    changingInputState(e, setNewsData)

  const fields: Field[] = [
    {
      label: 'Вовлекающий заголовок',
      type: FieldType.text,
      name: 'smallTitle',
      value: newsData.smallTitle,
      onChange: handleChangeInput,
      required: true,
      needWarning: true,
    },
    {
      label: 'URl-адрес png иконки',
      type: FieldType.text,
      name: 'smallImg',
      value: newsData.smallImg,
      onChange: handleChangeInput,
      placeholder: 'в формате https://....',
    },
    {
      label: 'Заголовок',
      type: FieldType.text,
      name: 'title',
      value: newsData.title,
      onChange: handleChangeInput,
      required: true,
      needWarning: true,
    },
    {
      label: 'Описание',
      type: FieldType.textarea,
      name: 'description',
      value: newsData.description,
      onChange: handleChangeInput,
      required: true,
      needWarning: true,
    },
    {
      label: 'Дополнительная информация',
      type: FieldType.textarea,
      name: 'details',
      value: newsData.details,
      onChange: handleChangeInput,
    },
    {
      label: 'URL-адрес фотографии',
      type: FieldType.text,
      name: 'img',
      value: newsData.img,
      onChange: handleChangeInput,
      placeholder: 'в формате https://....',
    },
  ]

  return (
    <CustomForm
      title={isCreate ? 'Добавить новую новость' : 'Редактирование информации'}
      fields={fields}
      onSubmit={handlesubmit}
      onCancel={() => navigate(RoutePath.home)}
      submitBtnTitle={isCreate ? 'Добавить' : 'Сохранить'}
    />
  )
}
