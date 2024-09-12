import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Logo from '../../../UI/Logo/Logo'

export default function Birthday() {
  //получение данных с сервера
  const [worker, setWorker] = useState(null)

  //получение данных с сервера
  useEffect(() => {
    fetch('/api/worker?_sort=month,day&_order=desc,asc')
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        setWorker(resp)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  //получение даты
  let curMonth = new Date().toLocaleString('ru', { month: 'long' })
  // console.log(curMonth) //месяц (июнь)

  let futMonth = new Date()
  futMonth.setMonth(futMonth.getMonth() + 1)
  let futureMonth = futMonth.toLocaleString('ru', { month: 'long' })
  // console.log(futureMonth) //будущий месяц

  let curday = new Date().getDate() //день
  // console.log(curday)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <>
      <Logo className="info-age__logo">Дни рождения</Logo>
      <div className="slider">
        <ul className="info-age__list" id="age__list">
          <Slider {...settings}>
            {worker &&
              worker.map((work) => {
                if (
                  (curday <= work.day && curMonth == work.month + 'ь') ||
                  (curday >= work.day && futureMonth == work.month + 'ь')
                )
                  return (
                    <li className="info-age__item" key={work.id}>
                      <div className="img-container ">
                        <div className="card__img imgcover">
                          <img
                            src={work.img}
                            alt=""
                            className="info-age__img"
                          />
                        </div>
                      </div>

                      <p className="info-age__text">{work.name}</p>
                      <p className="info-age__year">
                        {work.day} {work.month + 'я'}
                      </p>
                    </li>
                  )
              })}
          </Slider>
        </ul>
      </div>
    </>
  )
}
