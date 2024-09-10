import { Link, useNavigate } from 'react-router-dom'
import './WorkerPage.css'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '../../UI/Button/Button'

export default function Worker(props) {
  //получение данных с сервера
  const [worker, setWorker] = useState(null)

  //поиск
  const [records, setRecords] = useState(null)

  const navigate = useNavigate()

  //редактирование
  const LoadEdit = (id) => {
    navigate('/worker/edit/' + id)
  }

  //удаление
  const RemoveFunction = (id) => {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      fetch('/api/worker/' + id, {
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

  //получение данных с сервера
  useEffect(() => {
    fetch('/api/worker')
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        setWorker(resp)
        setRecords(resp)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  //поиск
  const FilterFunc = (event) => {
    const val = event.target.value.toLowerCase()
    setRecords(
      worker.filter(
        (f) =>
          f.name.toLowerCase().includes(val) ||
          f.job.toLowerCase().includes(val) ||
          f.number.toLowerCase().includes(val) ||
          f.mail.toLowerCase().includes(val) ||
          f.bday.toLowerCase().includes(val),
      ),
    )
  }

  const CreateWorker = () => {
    navigate('/worker/create')
  }

  return (
    <>
      <div className="find">
        <div className="container">
          <div className="find__inner">
            <img
              src="https://cdn-icons-png.flaticon.com/512/751/751463.png"
              alt=""
              className="find__img"
            />
            <input
              className="find__info"
              type="text"
              placeholder="Начните поиск"
              onChange={FilterFunc}
              id="filter"
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      {props.user?.isAdmin && (
        <div className="container ">
          <Button onClick={CreateWorker}>Добавить нового сотрудника</Button>
        </div>
      )}

      <div className="card">
        <div className="container">
          <div className="card__inner" id="card__list">
            {/*Выводим данные с сервера  */}
            {records &&
              records.map((work) => {
                return (
                  <div className="card__item" key={work.id}>
                    <div className="card__img imgcover">
                      <img src={work.img} alt="" className="img" />
                    </div>
                    <div className="card__info">
                      {/* <h3 className="FIO">{work.id}</h3> */}
                      <h3 className="FIO">{work.name}</h3>
                      <h4 className="job">Должность: {work.job}</h4>
                      <h4 className="telephone">Телефон: {work.number}</h4>
                      <h4 className="mail">Эл. почта: {work.mail}</h4>
                      <h4 className="date">Дата рождения: {work.bday}</h4>

                      {props.user?.isAdmin && (
                        <>
                          <Button onClick={() => LoadEdit(work.id)}>
                            Изменить
                          </Button>
                          <Button onClick={() => RemoveFunction(work.id)}>
                            Удалить
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

Worker.propTypes = {
  user: PropTypes.object,
}
