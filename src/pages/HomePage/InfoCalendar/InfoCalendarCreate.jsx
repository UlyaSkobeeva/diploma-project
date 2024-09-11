import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../../UI/Input/Input'

export default function CalendarCreate() {
  let currentMonth = new Date().toLocaleString('ru', { month: 'long' }) //текущий месяц

  const [day, setDay] = useState('')
  const [month, setMonth] = useState(currentMonth)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [details, setDetails] = useState('')

  //получить значение дня
  const dayChangeHandler = (event) => {
    setDay(Number(event.target.value))
  }

  //значение месяца
  const monthChangeHandler = (event) => {
    setMonth(event.target.value)
  }

  //заголовок
  const titleChangeHandler = (event) => {
    setTitle(event.target.value)
  }

  //описание
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value)
  }

  //доп. информация
  const detailsChangeHandler = (event) => {
    setDetails(event.target.value)
  }

  //подсветить красным если ничего нет
  const [validDay, setValidDay] = useState(true)
  const [validTitle, setValidTitle] = useState(true)

  //если нет описания
  const validDayChangeHandler = () => {
    setValidDay(false)
  }

  const validTitleChangeHandler = () => {
    setValidTitle(false)
  }

  const navigate = useNavigate()

  //отправить форму
  const submitHandler = (event) => {
    event.preventDefault()
    const calendarData = { day, month, title, description, details }

    fetch('/api/calendar', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(calendarData),
    })
      .then((res) => {
        alert('Информация о новом событии успешно добавлена!')
        navigate('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  //выпадающий список
  const options = [
    { label: 'январь', value: 'январь' },
    { label: 'февраль', value: 'февраль' },
    { label: 'март', value: 'март' },
    { label: 'апрель', value: 'апрель' },
    { label: 'май', value: 'май' },
    { label: 'июнь', value: 'июнь' },
    { label: 'июль', value: 'июль' },
    { label: 'август', value: 'август' },
    { label: 'сентябрь', value: 'сентябрь' },
    { label: 'октябрь', value: 'октябрь' },
    { label: 'ноябрь', value: 'ноябрь' },
    { label: 'декабрь', value: 'декабрь' },
  ]

  return (
    <div className="input-container">
      <h2 className="input-logo">Добавить новое событие</h2>
      <form onSubmit={submitHandler}>
        <Input
          label="Число"
          type="number"
          min="1"
          max="31"
          value={day}
          onChange={dayChangeHandler}
          placeholder="1"
          onMouseDown={validDayChangeHandler}
          required={true}
        >
          {day.length == 0 && !validDay && (
            <span className="label-danger"> * Введите число</span>
          )}
        </Input>

        {/* select */}
        <div className="input-elem">
          <label>Месяц</label>
          <select
            value={month}
            onChange={monthChangeHandler}
            name=""
            id=""
            className="input-inp"
          >
            {options.map((option) => (
              <option
                className="input-option"
                value={option.value}
                key={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Заголовок"
          value={title}
          onChange={titleChangeHandler}
          required={true}
          onMouseDown={validTitleChangeHandler}
        >
          {title.length == 0 && !validTitle && (
            <span className="label-danger"> * Введите заголовок</span>
          )}
        </Input>

        {/* textarea */}
        <div className="input-elem">
          <label>Описание</label>
          <textarea
            value={description}
            onChange={descriptionChangeHandler}
            style={{ height: '100px' }}
            className="input-inp"
          />
        </div>

        {/* textarea */}
        <div className="input-elem">
          <label>Дополнительная информация</label>
          <textarea
            value={details}
            onChange={detailsChangeHandler}
            style={{ height: '80px' }}
            className="input-inp"
          />
        </div>

        {/* КНОПКИ */}
        <div className="input-button-section">
          <button type="submit" className="input-button">
            Добавить
          </button>
          <Link to="/" className="input-button">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  )
}
