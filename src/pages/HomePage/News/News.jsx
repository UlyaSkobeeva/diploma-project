import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '../../../UI/Button/Button'
import styles from './News.module.css'
import Logo from '../../../UI/Logo/Logo'
import NewsList from './NewsList'

export default function News(props) {
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
        .then(() => {
          getNewsData()
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
    <div className={styles.news}>
      <div className="container">
        {props.user?.isAdmin && (
          <Button
            className={styles['news-create__button']}
            onClick={CreateNews}
          >
            Добавить новую новость
          </Button>
        )}

        <Logo className={styles['news__logo']}>Последние новости</Logo>
        <NewsList
          news={news}
          onClickDetail={LoadDetail}
          onClickRemove={RemoveFunction}
          onClickEdit={LoadEdit}
          user={props.user}
        />
      </div>
    </div>
  )
}

News.propTypes = {
  user: PropTypes.object,
}
