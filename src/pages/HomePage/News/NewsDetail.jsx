import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function NewsDetail() {
  const { newsid } = useParams()

  const [news, setNews] = useState({})

  useEffect(() => {
    fetch('/api/news/' + newsid)
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

  return (
    <>
      {news && (
        <div className="detail-container">
          <div className="detail-inner">
            <h2 style={{ paddingTop: '20px' }} className="detail-title">
              {news.title}
            </h2>
            <div className="detail-desc">
              <div className="desc">{news.desc}</div>
              <img className="detail-img" src={news.img} alt="" />
              <div className="details">{news.PS}</div>
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
