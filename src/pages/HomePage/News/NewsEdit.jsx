import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function NewsEdit() {
  const { newsid } = useParams()
  // const [workdata, useworkdatahcange] = useState({});

  useEffect(() => {
    fetch('/api/news/' + newsid)
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        idchange(resp.id)
        smalltitlechange(resp.smallTitle)
        smallimgchange(resp.smallImg)
        titlechange(resp.title)
        descchange(resp.desc)
        pschange(resp.PS)
        imgchange(resp.img)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const [id, idchange] = useState('')
  const [smallTitle, smalltitlechange] = useState('')
  const [smallImg, smallimgchange] = useState('')
  const [title, titlechange] = useState('')
  const [desc, descchange] = useState('')
  const [PS, pschange] = useState('')
  const [img, imgchange] = useState('')

  //подсветить красным если ничего нет
  const [valst, valstchange] = useState(false)
  const [valt, valtchange] = useState(false)
  const [vald, valdchange] = useState(false)

  const navigate = useNavigate()

  const handlesubmit = (e) => {
    e.preventDefault()
    const newsdata = { smallTitle, smallImg, title, desc, PS, img }

    fetch('/api/news/' + newsid, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newsdata),
    })
      .then((res) => {
        alert('Информация изменена!')
        navigate('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <div className="input-container">
      <h2 className="input-logo">Редактирование информации</h2>
      <form onSubmit={handlesubmit}>
        {/* <div >
                <label >id</label>
                <input  value={id} disabled="disabled"  className="input-component"/>          
            </div> */}
        <div className="input-elem">
          <label>Вовлекающий заголовок</label>
          <input
            value={smallTitle}
            onChange={(e) => smalltitlechange(e.target.value)}
            className="input-inp"
            required
            onMouseDown={() => valstchange(true)}
          />
          {smallTitle.length == 0 && valst && (
            <span className="label-danger">
              {' '}
              * Введите вовлекающий заголовок
            </span>
          )}
        </div>
        <div className="input-elem">
          <label>URl-адрес png иконки</label>
          <input
            value={smallImg}
            onChange={(e) => smallimgchange(e.target.value)}
            className="input-inp"
          />
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
            value={desc}
            onChange={(e) => descchange(e.target.value)}
            style={{ height: '150px' }}
            className="input-inp"
            required
            onMouseDown={() => valdchange(true)}
          ></textarea>
          {desc.length == 0 && vald && (
            <span className="label-danger"> * Введите описание</span>
          )}
        </div>
        <div className="input-elem">
          <label>Дополнительная информация</label>
          <textarea
            value={PS}
            onChange={(e) => pschange(e.target.value)}
            style={{ height: '100px' }}
            className="input-inp"
          ></textarea>
          {/* <input style={{height: "60px", wordWrap: "break-word"}}className="input-inp" /> */}
        </div>
        <div className="input-elem">
          <label>URL-адрес фотографии</label>
          <input
            value={img}
            onChange={(e) => imgchange(e.target.value)}
            className="input-inp"
          />
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
