import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function CalendarEdit() {
  const { calenid } = useParams()
  // const [workdata, useworkdatahcange] = useState({});

  useEffect(() => {
    fetch('/api/calendar/' + calenid)
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        idchange(resp.id)
        daychange(resp.day)
        monthchange(resp.month)
        titlechange(resp.title)
        descchange(resp.description)
        detailschange(resp.details)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const [id, idchange] = useState('')
  const [day, daychange] = useState('')
  const [month, monthchange] = useState('')
  const [title, titlechange] = useState('')
  const [description, descchange] = useState('')
  const [details, detailschange] = useState('')

  //подсветить красным если ничего нет
  const [vald, valdchange] = useState(false)
  const [valt, valtchange] = useState(false)
  const navigate = useNavigate()

  const handlesubmit = (e) => {
    e.preventDefault()
    const calendardata = { day, month, title, description, details }

    fetch('/api/calendar/' + calenid, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(calendardata),
    })
      .then((res) => {
        alert('Информация изменена!')
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
      <h2 className="input-logo">Редактирование информации</h2>
      <form onSubmit={handlesubmit}>
        {/* <div >
                <label >id</label>
                <input  value={id} disabled="disabled"  className="input-component"/>          
            </div> */}
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
            onMouseDown={() => valdchange(true)}
            required
          />
          {day.length == 0 && vald && (
            <span className="label-danger"> * Введите число</span>
          )}
        </div>
        <div className="input-elem">
          <label>Месяц</label>
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

            {/* <option value="январь">январь</option>
                    <option value="февраль">февраль</option>
                    <option value="март">март</option>
                    <option value="апрель">апрель</option>
                    <option value="май">май</option>
                    <option value="июнь">июнь</option>
                    <option value="июль">июль</option>
                    <option value="август">август</option>
                    <option value="сентябрь">сентябрь</option>
                    <option value="октябрь">октябрь</option>
                    <option value="ноябрь">ноябрь</option>
                    <option value="декабрь">декабрь</option> */}
          </select>
          {/* <input  value={month}  onChange={e=>monthchange(e.target.value)} className="input-inp" placeholder="январь"/> */}
        </div>
        <div className="input-elem">
          <label>Заголовок</label>
          <input
            value={title}
            onChange={(e) => titlechange(e.target.value)}
            className="input-inp"
            required
            onMouseDown={() => valtchange(true)}
          />
          {title.length == 0 && valt && (
            <span className="label-danger"> * Введите заголовок</span>
          )}
        </div>
        <div className="input-elem">
          <label>Описание</label>
          <textarea
            value={description}
            onChange={(e) => descchange(e.target.value)}
            style={{ height: '100px' }}
            className="input-inp"
          ></textarea>
          {/* <input style={{height: "60px", wordWrap: "break-word"}}className="input-inp" /> */}
        </div>
        <div className="input-elem">
          <label>Дополнительная информация</label>
          <textarea
            value={details}
            onChange={(e) => detailschange(e.target.value)}
            style={{ height: '80px' }}
            className="input-inp"
          ></textarea>
          {/* <input style={{height: "60px", wordWrap: "break-word"}}className="input-inp" /> */}
        </div>

        <div className="input-button-section">
          <button type="submit" className="input-button">
            Сохранить
          </button>
          <Link to="/" className="input-button">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  )
}
