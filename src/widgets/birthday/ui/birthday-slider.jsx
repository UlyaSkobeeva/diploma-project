import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import styles from './birthday-slider.module.css'

export const BirthdaySlider = () => {
  //получение данных с сервера
  const [workers, setWorkers] = useState(null)

  //получение данных с сервера
  useEffect(() => {
    fetch('/api/worker?_sort=month,day&_order=desc,asc')
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        setWorkers(resp)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className={styles['birthday-slider']}>
      <h2 className={styles['birthday-slider__title']}>Дни рождения</h2>
      <ul className={styles['birthday-slider__list']}>
        <Slider {...settings}>
          {workers &&
            workers.map((worker) => {
              return (
                <li className={styles['birthday-slider__item']} key={worker.id}>
                  <div className={styles['image-container']}>
                    <div className={styles['image']}>
                      <img src={worker.img} alt="" />
                    </div>
                  </div>

                  <p className={styles['name-info']}>{worker.name}</p>
                  <p className={styles['age-info']}>{worker.birthday}</p>
                </li>
              )
            })}
        </Slider>
      </ul>
    </div>
  )
}
