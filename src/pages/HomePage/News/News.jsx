import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '../../../UI/Button/Button'
import styles from './News.module.css'

export default function News(props) {
  //получение данных с сервера
  const [news, setNews] = useState(null)

  const navigate = useNavigate()

  //получение данных с сервера
  useEffect(() => {
    fetch('/api/news?_sort=id&_order=desc')
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        setNews(resp)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  // подробности
  const LoadDetail = (id) => {
    navigate('/news/detail/' + id)
  }

  //редактировать
  const LoadEdit = (id) => {
    navigate('/news/edit/' + id)
  }

  //удаление
  const RemoveFunction = (id) => {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      fetch('/api/news/' + id, {
        method: 'DELETE',
      })
        .then((res) => {
          // alert("Данные были удалены")
          window.location.reload()
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }

  const CreateNews = () => {
    navigate('/news/create')
  }

  return (
    <div className="news">
      <div className="container">
        {props.user?.isAdmin && (
          <div>
            <Button
              className={styles['news-create__button']}
              onClick={CreateNews}
            >
              Добавить новую новость
            </Button>
          </div>
        )}

        <div className="news__logo logo">Последние новости</div>

        <div className="news__inner">
          {news &&
            news.map((newElem) => {
              return (
                <div className="news__item" key={newElem.id}>
                  <div className="news__foto">
                    <img className="picture" src={newElem.smallImg} alt="" />
                  </div>
                  <div className="news__text">
                    <p className="news__paragraph">{newElem.smallTitle}</p>
                    <a
                      onClick={() => {
                        LoadDetail(newElem.id)
                      }}
                      className="news__link"
                    >
                      Читать больше →
                    </a>
                  </div>

                  {props.user?.isAdmin && (
                    <div className="input-button-section">
                      <Button
                        className={styles['news-controls__button']}
                        onClick={() => {
                          LoadEdit(newElem.id)
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
              )
            })}
        </div>
      </div>
    </div>
  )
}

News.propTypes = {
  user: PropTypes.object,
}
