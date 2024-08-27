// Ближайшие события
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function InfoCalendar(props) {
  //получение данных с сервера
  const [calendars, setCalendars] = useState(null)

  const navigate = useNavigate()

  //получение данных с сервера
  useEffect(() => {
    fetch('/api/calendar?_sort=month,day&_order=desc,asc')
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        setCalendars(resp)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  // подробности
  const LoadDetail = (id) => {
    navigate('/calendar/detail/' + id)
  }

  const LoadEdit = (id) => {
    navigate('/calendar/edit/' + id)
  }

  //удаление
  const RemoveFunction = (id) => {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      fetch('/api/calendar/' + id, {
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

  //получение даты
  let curMonth = new Date().toLocaleString('ru', { month: 'long' }) //месяц (июнь)

  let futMonth = new Date()
  futMonth.setMonth(futMonth.getMonth() + 1)
  let futureMonth = futMonth.toLocaleString('ru', { month: 'long' }) //будущий месяц

  let curday = new Date().getDate() //день

  // console.log(props)
  return (
    <>
      <div className="info-calendar">
        {props.user?.isAdmin && (
          <div>
            <Link
              className="operate-button"
              to="/calendar/create"
              role="button"
            >
              Добавить новое событие
            </Link>
          </div>
        )}

        <div className="info-calendar__logo logo">Ближайшие события</div>

        <div className="info-calendar__list">
          {/*Выводим данные с сервера  */}
          {calendars &&
            calendars.map((calendar) => {
              // условие для вывода дат
              if (
                (curday <= calendar.day && curMonth == calendar.month) ||
                (curday >= calendar.day && futureMonth == calendar.month)
              )
                return (
                  <div key={calendar.id}>
                    <div className="info-calendar__item">
                      <div className="info-calendar__date">
                        <p className="day">{calendar.day}</p>
                        <p className="month">{calendar.month}</p>
                      </div>
                      <p className="info-calendar__text">{calendar.title}</p>
                      <a
                        onClick={() => {
                          LoadDetail(calendar.id)
                        }}
                        className="plus__btn"
                      >
                        +
                      </a>
                    </div>

                    {props.user?.isAdmin && (
                      <div className="calendar-button">
                        <a
                          onClick={() => {
                            LoadEdit(calendar.id)
                          }}
                          className="operate-button"
                        >
                          Изменить
                        </a>
                        <a
                          onClick={() => RemoveFunction(calendar.id)}
                          type="button"
                          className="operate-button"
                        >
                          Удалить
                        </a>
                      </div>
                    )}
                  </div>
                )
            })}
        </div>
      </div>
    </>
  )
}

InfoCalendar.propTypes = {
  user: PropTypes.object,
}
