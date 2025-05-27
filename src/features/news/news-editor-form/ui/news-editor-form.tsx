import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { NewsEditorFormProps } from '../types'
import { changingInputState } from '../../../../shared/lib/utils/changing-input-state'
import { CustomForm } from '../../../../shared/ui/custom-form'
import { FieldType, News } from '../../../../shared/types'
import { RoutePath } from '../../../../shared/types/route-path'

export const NewsEditorForm = (props: NewsEditorFormProps) => {
  const { isCreate } = props

  const { newsId } = useParams()

  const navigate = useNavigate()

  const [newsData, setNewsData] = useState<News>({
    smallTitle: '',
    smallImg: '',
    title: '',
    description: '',
    details: '',
    img: '',
  })

  useEffect(() => {
    !isCreate &&
      fetch('/api/news/' + newsId)
        .then((res) => {
          return res.json()
        })
        .then((resp) => {
          setNewsData({
            smallTitle: resp.smallTitle,
            smallImg: resp.smallImg,
            title: resp.title,
            description: resp.description,
            details: resp.details,
            img: resp.img,
          })
        })
        .catch((err) => {
          console.log(err.message)
        })
  }, [])

  const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    fetch(isCreate ? '/api/news' : `/api/news/${newsId}`, {
      method: isCreate ? 'POST' : 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newsData),
    })
      .then((res) => {
        alert('Новая новость успешно добавлена!')
        navigate(RoutePath.home)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    changingInputState(e, setNewsData)

  const fields = [
    {
      label: 'Вовлекающий заголовок',
      type: FieldType.text,
      name: 'smallTitle',
      value: newsData.smallTitle,
      onChange: handleChangeInput,
      required: true,
    },
    {
      label: 'URl-адрес png иконки',
      type: FieldType.text,
      name: 'smallImg',
      value: newsData.smallImg,
      onChange: handleChangeInput,
    },
    {
      label: 'Заголовок',
      type: FieldType.text,
      name: 'title',
      value: newsData.title,
      onChange: handleChangeInput,
      required: true,
    },
    {
      label: 'Описание',
      type: FieldType.textarea,
      name: 'description',
      value: newsData.description,
      onChange: handleChangeInput,
      required: true,
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
