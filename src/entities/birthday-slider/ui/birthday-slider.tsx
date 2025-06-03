import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import styles from './birthday-slider.module.css'
import { WorkerData } from '../../../shared/types'
import { formatDate } from '../../../shared/lib/utils/format-date'

import { getUpcomingBirthdayDates } from '../lib/utils/get-upcoming-birthday-dates'

export const BirthdaySlider = () => {
  const [workers, setWorkers] = useState<WorkerData[]>([])

  //получение данных с сервера
  //TODO убрать запрос, подключить редакс
  useEffect(() => {
    fetch('/api/worker')
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
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  //TODO сортировка дат (только месяц и день)
  const filteredWorkers = getUpcomingBirthdayDates(workers)

  return (
    <div className={styles['birthday-slider']}>
      <h2 className={styles['birthday-slider__title']}>Дни рождения</h2>
      <ul className={styles['birthday-slider__list']}>
        <Slider {...settings}>
          {filteredWorkers?.map(({ id, img, name, date }) => {
            return (
              <li className={styles['birthday-slider__item']} key={id}>
                <div className={styles['image-container']}>
                  <div className={styles['image']}>
                    <img src={img} alt="" />
                  </div>
                </div>

                <p className={styles['name-info']}>{name}</p>
                <p className={styles['age-info']}>{formatDate(date)}</p>
              </li>
            )
          })}
        </Slider>
      </ul>
    </div>
  )
}
