// Ближайшие события
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../UI/Button/Button'

export default function InfoCalendar(props) {
  //получение данных с сервера
  const [calendars, setCalendars] = useState([])

  const navigate = useNavigate()

  //получить данные с сервера
  const getCalendarData = () => {
    fetch('/api/calendar?_sort=month,day&_order=desc,asc')
      .then((response) => {
        return response.json()
      })
      .then((calendarData) => {
        setCalendars(calendarData)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  useEffect(() => {
    getCalendarData()
  }, [])

  // подробности
  const LoadDetail = (id) => {
    navigate('/calendar/detail/' + id)
  }

  //редактировать
  const LoadEdit = (id) => {
    navigate('/calendar/edit/' + id)
  }

  //создать новую
  const CreateCalendar = () => {
    navigate('/calendar/create')
  }

  //удаление
  const RemoveFunction = (id) => {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      fetch('/api/calendar/' + id, {
        method: 'DELETE',
      })
        .then(() => {
          getCalendarData()
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

  //отфильтрованный массив дат (за месяц)
  const filteredCalendars = calendars.filter((calendar) => {
    return (
      // условие для вывода дат
      (curday <= calendar.day && curMonth == calendar.month) ||
      (curday >= calendar.day && futureMonth == calendar.month)
    )
  })

  return (
    <>
      <div className="info-calendar">
        {props.user?.isAdmin && (
          <div>
            <Button onClick={CreateCalendar}> Добавить новое событие</Button>
          </div>
        )}

        <div className="info-calendar__logo logo">Ближайшие события</div>

        <div className="info-calendar__list">
          {/* вывод отфильтрованного массива */}
          {filteredCalendars.map((calendar) => (
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
                <div>
                  <Button
                    onClick={() => {
                      LoadEdit(calendar.id)
                    }}
                  >
                    Изменить
                  </Button>
                  <Button onClick={() => RemoveFunction(calendar.id)}>
                    Удалить
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

InfoCalendar.propTypes = {
  user: PropTypes.object,
}
