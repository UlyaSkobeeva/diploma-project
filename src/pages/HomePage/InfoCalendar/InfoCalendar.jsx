// Ближайшие события
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../UI/Button/Button'
import InfoCalendarList from './InfoCalendarList'
import styles from './InfoCalendar.module.css'
import Logo from '../../../UI/Logo/Logo'

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
      <div className={styles['info-calendar']}>
        {props.user?.isAdmin && (
          <Button onClick={CreateCalendar}> Добавить новое событие</Button>
        )}

        <Logo className={styles['info-calendar__logo']}>Ближайшие события</Logo>

        <InfoCalendarList
          onClickDetail={LoadDetail}
          onClickEdit={LoadEdit}
          onClickRemove={RemoveFunction}
          filteredCalendars={filteredCalendars}
          user={props.user}
        />
      </div>
    </>
  )
}

InfoCalendar.propTypes = {
  user: PropTypes.object,
}
