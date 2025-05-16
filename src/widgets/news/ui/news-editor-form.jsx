import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { CustomForm } from '../../../shared/ui/custom-form'
import { changingInputState } from '../../../shared/lib/utils/changing-input-state'

export const NewsEditorForm = (props) => {
  const { isCreate } = props

  const { newsId } = useParams() // для редактирования

  const navigate = useNavigate()

  const [newsData, setNewsData] = useState({
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

  const handlesubmit = (e) => {
    e.preventDefault()

    fetch(isCreate ? '/api/news' : `/api/news/${newsId}`, {
      method: isCreate ? 'POST' : 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newsData),
    })
      .then((res) => {
        alert('Новая новость успешно добавлена!')
        navigate('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const handleChangeInput = (e) => changingInputState(e, setNewsData)

  //поля для формы
  const fields = [
    {
      label: 'Вовлекающий заголовок',
      type: 'text',
      name: 'smallTitle',
      value: newsData.smallTitle,
      onChange: handleChangeInput,
      required: true,
    },
    {
      label: 'URl-адрес png иконки',
      type: 'text',
      name: 'smallImg',
      value: newsData.smallImg,
      onChange: handleChangeInput,
    },
    {
      label: 'Заголовок',
      type: 'text',
      name: 'title',
      value: newsData.title,
      onChange: handleChangeInput,
      required: true,
    },
    {
      label: 'Описание',
      type: 'textarea',
      name: 'description',
      value: newsData.description,
      onChange: handleChangeInput,
      required: true,
    },
    {
      label: 'Дополнительная информация',
      type: 'textarea',
      name: 'details',
      value: newsData.details,
      onChange: handleChangeInput,
    },
    {
      label: 'URL-адрес фотографии',
      type: 'text',
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
      onCancel={() => navigate('/')}
      submitBtn={isCreate ? 'Добавить' : 'Сохранить'}
    />
  )
}
