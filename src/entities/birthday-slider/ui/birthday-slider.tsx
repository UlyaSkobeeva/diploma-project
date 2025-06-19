import { useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import styles from './birthday-slider.module.css'
import { formatDate } from '../../../shared/lib/utils/format-date'

import { getUpcomingBirthdayDates } from '../lib/utils/get-upcoming-birthday-dates'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/utils/use-app'
import { fetchWorkers } from '../../../app/store/workers/workers-action'
import { workerSelector } from '../../../app/store/workers/workers-slice'

export const BirthdaySlider = () => {
  const dispatch = useAppDispatch()
  const workers = useAppSelector(workerSelector)

  useEffect(() => {
    !workers.length && dispatch(fetchWorkers())
  }, [])

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const filteredWorkers = getUpcomingBirthdayDates(workers)

  return (
    <div className={styles['birthday-slider']}>
      <h2 className={styles['birthday-slider__title']}>Дни рождения</h2>
      <ul className={styles['birthday-slider__list']}>
        <Slider {...settings}>
          {filteredWorkers.length ? (
            filteredWorkers?.map(({ id, img, name, date }) => {
              return (
                <li className={styles['birthday-slider__item']} key={id}>
                  <div className={styles['birthday-slider__image']}>
                    <img src={img} alt="фото сотрудника" />
                  </div>

                  <p className={styles['birthday-slider__name']}>{name}</p>
                  <p className={styles['birthday-slider__age']}>
                    {formatDate(date)}
                  </p>
                </li>
              )
            })
          ) : (
            <p className={styles['birthday-slider--empty']}>
              информация отствует
            </p>
          )}
        </Slider>
      </ul>
    </div>
  )
}
