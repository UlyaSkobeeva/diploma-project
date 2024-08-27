import { useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'

export default function WorkerCreate() {
  const [id, idchange] = useState('')
  const [name, namechange] = useState('')
  const [job, jobchange] = useState('')
  const [number, numberchange] = useState('')
  const [mail, mailchange] = useState('')
  const [bday, bdaychange] = useState('')
  const [img, imgchange] = useState('')

  const [day, daychange] = useState('')
  const [month, monthchange] = useState('')

  //подсветить красным если ничего нет
  const [valm, valmchange] = useState(false)
  const [valj, valjchange] = useState(false)
  const [valn, valnchange] = useState(false)
  const [valp, valpchange] = useState(false)
  const [valb, valbchange] = useState(false)

  const navigate = useNavigate()

  const handlesubmit = (e) => {
    e.preventDefault()
    const workdata = { name, job, number, mail, bday, img, day, month }

    // const dateObject = new Date()
    // const id = dateObject.getTime()
    fetch('/api/worker', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(workdata),
    })
      .then((res) => {
        alert('Информация о новом сотруднике успешно добавлена!')
        navigate('/worker')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  //выпадающий список
  const options = [
    { label: 'января', value: 'январ' },
    { label: 'февраля', value: 'феврал' },
    { label: 'марта', value: 'март' },
    { label: 'апреля', value: 'апрел' },
    { label: 'мая', value: 'ма' },
    { label: 'июня', value: 'июн' },
    { label: 'июля', value: 'июл' },
    { label: 'августа', value: 'августа' },
    { label: 'сентября', value: 'сентябр' },
    { label: 'октября', value: 'октябр' },
    { label: 'ноября', value: 'ноябр' },
    { label: 'декабря', value: 'декабр' },
  ]

  return (
    <div className="input-container">
      <h2 className="input-logo">Добавить нового сотрудника</h2>
      {/* <h4 className="label-danger">*Обязательные поля для заполнения</h4> */}
      <form onSubmit={handlesubmit}>
        {/* <div >
                <label >id</label>
                <input  value={id} disabled="disabled"  className="input-component"/>          
            </div> */}
        <div className="input-elem">
          <label>ФИО</label>
          <input
            required
            value={name}
            onMouseDown={(e) => valmchange(true)}
            onChange={(e) => namechange(e.target.value)}
            className="input-inp"
          />
          {name.length == 0 && valm && (
            <span className="label-danger"> * Введите ФИО</span>
          )}
        </div>
        <div className="input-elem">
          <label>Должность</label>
          <input
            required
            value={job}
            onMouseDown={(e) => valjchange(true)}
            onChange={(e) => jobchange(e.target.value)}
            className="input-inp"
          />
          {job.length == 0 && valj && (
            <span className="label-danger"> * Введите должность</span>
          )}
        </div>
        <div className="input-elem">
          <label>Номер телефона</label>
          <input
            required
            value={number}
            onMouseDown={(e) => valnchange(true)}
            onChange={(e) => numberchange(e.target.value)}
            className="input-inp"
          />
          {number.length == 0 && valn && (
            <span className="label-danger"> * Введите номер</span>
          )}
        </div>
        <div className="input-elem">
          <label>Эл. почта</label>
          <input
            required
            value={mail}
            onMouseDown={(e) => valpchange(true)}
            onChange={(e) => mailchange(e.target.value)}
            placeholder="...@mail.ru"
            className="input-inp"
          />
          {mail.length == 0 && valp && (
            <span className="label-danger"> * Введите адрес эл. почты</span>
          )}
        </div>
        <div className="input-elem">
          <label>Дата рождения</label>
          <input
            required
            placeholder="Формат ввода: 1 января"
            onMouseDown={(e) => valbchange(true)}
            value={bday}
            onChange={(e) => bdaychange(e.target.value)}
            className="input-inp"
          />
          {bday.length == 0 && valb && (
            <span className="label-danger"> * Введите дату рождения</span>
          )}
        </div>
        <div className="input-elem">
          <label>Фото</label>
          <input
            placeholder="URL-адрес"
            className="input-inp"
            value={img}
            onChange={(e) => imgchange(e.target.value)}
          />
        </div>
        <h2 className="input-logo" style={{ fontSize: '14px' }}>
          Заполните поля ниже, если нужно отображать день рождения на главной
          странице
        </h2>
        <div className="input-elem">
          <label>Число</label>
          <input
            type="number"
            min="1"
            max="31"
            value={day}
            onChange={(e) => daychange(Number(e.target.value))}
            className="input-inp"
            placeholder="1"
          />
        </div>
        <select
          value={month}
          onChange={(e) => monthchange(e.target.value)}
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
              {' '}
              {option.label}
            </option>
          ))}
        </select>
        <div className="input-button-section" style={{ marginTop: '20px' }}>
          <button type="submit" className="input-button">
            Добавить
          </button>
          <Link to="/worker" className="input-button">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  )
}
