import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function CalendarDetail() {
  const { calenid } = useParams()

  const [calendars, setCalendars] = useState({})

  useEffect(() => {
    fetch('/api/calendar/' + calenid)
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

  return (
    <>
      {calendars && (
        <div className="detail-container">
          <div className="detail-inner">
            <div className="detail-date">
              <h1 className="detail-day">{calendars.day}</h1>
              <h3 className="detail-month">{calendars.month}</h3>
            </div>
            <h2 className="detail-title">{calendars.title}</h2>
            <div className="detail-desc">
              <div className="desc">{calendars.desc}</div>
              <div className="details">{calendars.details}</div>
            </div>
            <div className="detail-cancel">
              <Link to="/" className="input-button">
                Назад
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
