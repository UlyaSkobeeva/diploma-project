//посмотреть классы, переименовать функции, разделить компонент

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './news-component.module.css'
import Logo from '../../../UI/Logo/Logo'

import { Button } from '../../../shared/ui/button'

export const News = (props) => {
  //получение данных с сервера
  const [news, setNews] = useState([])

  const navigate = useNavigate()

  //получение данных с сервера
  const getNewsData = () => {
    fetch('/api/news?_sort=id&_order=desc')
      .then((response) => {
        return response.json()
      })
      .then((newsData) => {
        setNews(newsData)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  useEffect(() => {
    getNewsData()
  }, [])

  //удаление
  const RemoveFunction = (id) => {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      fetch('/api/news/' + id, {
        method: 'DELETE',
      })
        .then(() => {
          getNewsData()
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }

  return (
    <div className={styles['news']}>
      <div className="container">
        {props.user?.isAdmin && (
          <Button
            className={styles['news-create__button']}
            onClick={() => navigate('/news/create')}
          >
            Добавить новую новость
          </Button>
        )}

        <Logo className={styles['news__logo']}>Последние новости</Logo>
        <div className={styles['news__list']}>
          {news.map((newElem) => (
            <div className={styles['news__item']} key={newElem.id}>
              <div className={styles['news__foto']}>
                <img src={newElem.smallImg} alt="" />
              </div>
              <div className={styles['news__text']}>
                <p>{newElem.smallTitle}</p>
                <a onClick={() => navigate('/news/detail/' + newElem.id)}>
                  Читать больше →
                </a>
              </div>

              {props.user?.isAdmin && (
                <div className="input-button-section">
                  <Button
                    className={styles['news-controls__button']}
                    onClick={() => {
                      navigate('/news/edit/' + newElem.id)
                    }}
                  >
                    Изменить
                  </Button>
                  <Button
                    className={styles['news-controls__button']}
                    onClick={() => RemoveFunction(newElem.id)}
                  >
                    Удалить
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

News.propTypes = {
  user: PropTypes.object,
}
